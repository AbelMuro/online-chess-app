import React, {useEffect, useMemo, createContext} from 'react';
import DisplayPlayer from './DisplayPlayer';
import * as styles from './styles.module.css';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import icons from '~/assets/icons';
import convertBase64ToBlobURL from '~/assets/functions/convertBase64ToBlobURL.js';
import DisplayCurrentChallenge from './DisplayCurrentChallenge';
import useWebSocket from '~/Hooks/useWebSocket';
import useWebRTC from '~/Hooks/useWebRTC';


/* 
    We create a queue by using a collection in mongoDB, every player that joins the queue will have their username and other metadata in the collection.

    When a player joins the queue, they will be connected to TWO websockets, the 'queue' websocket and the 'account' websocket.
    Everytime a new player joins the queue, the 'queue' websocket will automatically notify all other players that a new person joined the queue.

    These are the steps that take place when one player challenges another player to a chess match

    -Player A challenged Player B to a chess match

    1) Player A clicks on the challenge button

    2) The click event will create a 'Challenge' document, and another websocket that detects changes to that 'Challenge' document, Player A will be connected to that websocket

    3) The 'hasBeenChallenged' property of Player B will then be updated with the username of Player A and the _id of the 'Challenge' document

    4) When the 'hasBeenChallenged' property is updated, this will trigger the account websocket for Player B, and send the _id of the 'Challenge' document to Player B
       At the same time, Player B will also be connected to the websocket for the 'Challenge' document

    5) A dialog will then be displayed to Player B, asking them to accept or decline the challenge

        -If they accept, then a new Match document will be created. The _id of the Match document will be saved in the 'matchId' property of the Challenge document
        -If they decline, then the Challenge document will be destroyed, as well as the websocket for the challenge document

    6) When the 'matchId' of the Challenge document is updated, this will trigger the Challenge websocket for both players. 
       In doing so, both players will have access to the _id of the Match document

    7) Then we navigate to the chessboard with the _id of the Match document, any moves in the chessboard will be saved to the Match document
    

*/


export const PeerToPeerConnection = createContext();

function FindPlayers() {
    const dispatch = useDispatch();
    const [sendMessageToRemoteClient, sendOfferToRemoteClient, receiveMessageFromRemoteClient, localClient] = useWebRTC();
    const [queue, setQueue] = useWebSocket(
        'wss://world-class-chess-server.com:443/queue', 
        (e) => {
            const documents = JSON.parse(e.data);             
            setQueue(documents);            
        }, []);
    const navigate = useNavigate();

    const handleLeave = () => {
        const choice = confirm('Are you sure you want to leave queue?');

        if(choice)
            leaveQueue();
    }

    const leaveQueue = async () => {
        try{
            const response = await fetch('https://world-class-chess-server.com/leave_queue', {
                method: 'DELETE',
                credentials: 'include',
            })
            
            if(response.status === 200){
                const result = await response.text();
                console.log(result);
                navigate('/menu');
            }
            else if(response.status === 403){
                const result = await response.text();
                console.log(result);
                dispatch({type: 'DISPLAY_MESSAGE', payload: {message: result}})
                navigate('/');
            }
            else if(response.status === 404){
                const result = await response.text();
                console.log(result);
                dispatch({type: 'DISPLAY_MESSAGE', payload: {message: result}})
            }
            else{
                const result = await response.text();
                console.log(result)
                dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Internal Server Error has occurred, please try again later.'}})
            }
        }
        catch(error){
            const message = error.message;
            console.log(message);
            dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Server is offline, please try again later.'}});
        }
    }

    const putPlayerInQueue = async () => {
        try{
            const response = await fetch('https://world-class-chess-server.com/put_player_in_queue', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: {},
                credentials: 'include'
            });

            if(response.status === 200){
                const result = await response.json();
                const message = result.message;
                console.log(message);
            }
            else if(response.status === 403){
                const result = await response.text();
                console.log(result);
                dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Please enable third-party cookies in your browser to use this app'}})
                navigate('/');
            }
            else if(response.status === 401){
                const result = await response.text();
                console.log(result);
            }
            else{
                const result = await response.text();
                console.log(result);
                dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Internal Server Error has occurred, please try again later.'}})
            }
        }
        catch(error){
            const message = error.message;
            console.log(message);
            dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Server is offline, please try again later'}})
        }
    }

    const availablePlayers = useMemo(() => {
        const newQueue = [];

        for(let i = 0; i < queue.length; i++){
            const currentPlayer = sessionStorage.getItem('username');
            if(!currentPlayer) {
                navigate('/menu')
                return;
            }
            if(queue[i].player === currentPlayer) continue;

            const playerInQueue = queue[i].player;
            const profileImageBase64 = queue[i].profileImageBase64;
            const contentType = queue[i].contentType;
            const url = profileImageBase64 ? convertBase64ToBlobURL(profileImageBase64, contentType) : icons['empty avatar'];

            newQueue.push(<DisplayPlayer username={playerInQueue} image={url} profileImageBase64={profileImageBase64} contentType={contentType}/>)                
        }

        return newQueue;

    }, [queue])

    useEffect(() => {
        putPlayerInQueue();
    }, [])


    useEffect(() => {

       const removePlayerFromQueue = () => {
            fetch('https://world-class-chess-server.com/leave_queue', {
                method: 'DELETE',
                credentials: 'include',
                keepalive: true
            });                
        }    
        
        window.addEventListener('beforeunload', removePlayerFromQueue);

        return () => {
            window.removeEventListener('beforeunload', removePlayerFromQueue);
            leaveQueue && leaveQueue();
        }
    }, [])


    return(
        <PeerToPeerConnection.Provider value={{sendMessageToRemoteClient, sendOfferToRemoteClient, receiveMessageFromRemoteClient, localClient}}>
            <DisplayCurrentChallenge/>
            <section className={styles.container}>
                <section className={styles.queue}>
                    <h1 className={styles.queue_title}>
                        You have entered the queue
                    </h1>
                    {availablePlayers.length === 0 && <h2 className={styles.queue_desc}>
                        Looking for other players
                    </h2>}
                    {availablePlayers.length === 0 ? <ClipLoader size={'35px'} color='#CECECE'/> : availablePlayers}
                    <button className={styles.queue_button} onClick={handleLeave}>
                        Leave Queue
                    </button>
                </section>  
            </section>        
        </PeerToPeerConnection.Provider>
    )
}

export default FindPlayers;