import React, {useState, useContext} from 'react';
import WaitingForReply from './WaitingForReply';
import {ClipLoader} from 'react-spinners';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux'; 
import { AnimatePresence } from 'framer-motion';
import { PeerToPeerConnection } from '`/';
import * as styles from './styles.module.css';

/* 
    const callbackForChallengeWebSocket = (navigate, dispatch, challengeId, setWaiting) => {

        return async function (e) {
            const result = JSON.parse(e.data);
            if(!result) return;
            const message = result.message;
            const matchId = result.matchId;
            const playerWhoDeclined = result.playerWhoDeclined;
            const username = sessionStorage.getItem('username');

            try{
                if(message === 'initiate match'){
                    console.log('initiate match')
                    this.close();
                    const response = await fetch(`https://world-class-chess-server.com/delete_challenge/${challengeId}`, {     //endpoint will delete Challenge document, destroy websocket server, and create match
                        method: 'DELETE',
                    })

                    if(response.status === 200){
                        console.log('Challenge websocket and challenge document have been deleted');
                        navigate(`/chessboard/${matchId}`, {state: {matchId}});
                        dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Match has been created!'}});
                    }
                    else {
                        const result = await response.text();
                        console.log(result);
                        dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Internal Server Error has occurred, please try again later'}});
                    }
                }
                    
                else if(message === 'decline match'){
                    console.log('declined');
                    setWaiting(false);
                    this.close();
                    const response = await fetch(`https://world-class-chess-server.com/delete_challenge/${challengeId}`, {     //endpoint will delete Challenge document, destroy websocket server, and create match
                        method: 'DELETE',
                    })

                    if(response.status === 200){
                        await response.json();
                        if(playerWhoDeclined === username)
                            dispatch({type: 'DISPLAY_MESSAGE', payload: {message: `Challenge has been cancelled`}});
                        else
                            dispatch({type: 'DISPLAY_MESSAGE', payload: {message: `${playerWhoDeclined} has declined`}});
                    }
                    else {
                        const result = await response.text();
                        console.log(result);
                        dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Internal Server Error has occurred, please try again later'}});
                    }
                }
            }
            catch(error){
                const message = error.message;
                console.log(message);
                dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Server is offline, please try again later'}});
            }
        }
    }
*/


function DisplayPlayer({username, image}) {
    const [loading, setLoading] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {startConnection} = useContext(PeerToPeerConnection);

    const handleConnection = () => {
        startConnection();    
    }


    /* 
        const handleChallenge = async () => {
            try{
                setLoading(true);
                const response = await fetch('https://world-class-chess-server.com/create_challenge', {     //we create the challenge websocket
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({playerToBeChallenged: username})
                });   
                
                if(response.status === 200){
                    const result = await response.json();
                    console.log(result.message);
                    const _id = result.challengeId;
                    ConnectToWebSocket(`wss://world-class-chess-server.com:443/${_id}`, callbackForChallengeWebSocket(navigate, dispatch, _id, setWaiting))
                    setWaiting(_id);
                }
                else if(response.status === 401){
                    const result = await response.text();
                    console.log(result);
                    dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Player has already been challenged by someone else.'}})
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
                dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Server is offline, please try again later.'}})
            }
            finally{
                setLoading && setLoading(false);
            }
        }    
    */


    return(    
        <>
            <AnimatePresence>
                {waiting && <WaitingForReply challengeId={waiting} waitingForPlayerUsername={username}/>}
            </AnimatePresence>
            <div className={styles.queue_player} key={username}>
                <img className={styles.queue_player_image} src={image}/>
                <h3>
                    {username}
                </h3>
                <button onClick={handleConnection} className={styles.queue_button}>
                    {loading ? <ClipLoader size='30px' color='#CECECE'/> : 'Challenge'}
                </button>
            </div>        
        </>           

    )
}

export default DisplayPlayer;