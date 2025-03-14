import React, {useEffect, useState, useRef, useMemo} from 'react';
import {useSelector} from 'react-redux';
import * as styles from './styles.module.css';
import {useNavigate} from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import icons from '~/assets/icons';
import convertBase64ToBlobURL from '~/assets/functions/convertBase64ToBlobURL.js';
import connectToWebSocket from '~/assets/functions/connectToWebSocket.js';

//this is where i left off, now i need to format the queue state object to make sure it doesnt display the current user as one of the available players to play against
//then once the player selects another player to challenge, i need to find a way to connect both players in the same session and create a match between them
 
function FindPlayers() {
    const board = useSelector(state => state.chess.board);
    const username = useRef('');
    const [queue, setQueue] = useState([]);
    const navigate = useNavigate();

    const handleCreateMatch = async () => {
        const matchId = Array.from({length: 10}, () => null).reduce((acc) => {acc += Math.floor(Math.random() * 9); return acc}, '');

        try{
            const response = await fetch('http://localhost:4000/create_match', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({board, matchId})
            })

            if(response.status === 200){
                const result = await response.text();
                console.log(result);
                navigate(`/chessboard/${matchId}`);
            }

            else{
                const result = await response.text();
                console.log(result)
                alert('Internal Server Error, please try again later')
            }

        }
        catch(error){
            const message = error.message;
            console.log(message);
            alert('Server is offline, please try again later');
        }
    }

    const detectQueueChanges = (event) => {
        const change = JSON.parse(event.data);
        const operation = change?.operationType;

        if(operation ===  'insert')
            setQueue((queue) => {
                return [...queue, change.fullDocument]
            }); 
        else{
            const _id = change.documentKey._id;
            setQueue((queue) => {
                return queue.filter((player) => {
                    return player._id === _id
                })
            })            
        }    
    }


    const handleLeave = () => {
        const choice = confirm('Are you sure you want to leave queue?');

        if(choice)
            leaveQueue();
    }

    const leaveQueue = async () => {
        try{
            const response = await fetch('http://localhost:4000/leave_queue', {
                method: 'DELETE',
                credentials: 'include'
            })
            
            if(response.status === 200){
                const result = await response.text();
                console.log(result);
                navigate('/menu');
            }
            else if(response.status === 403){
                const result = await response.text();
                console.log(result);
                alert(result);
                navigate('/');
            }
            else if(response.status === 404){
                const result = await response.text();
                console.log(result);
            }
            else{
                const result = await response.text();
                console.log(result)
                alert('Internal Server Error has occured, please try again later')
            }
        }
        catch(error){
            const message = error.message;
            console.log(message);
            alert('Server is offline, please try again later');
        }
    }


    const putPlayerInQueue = async () => {
        try{
            const response = await fetch('http://localhost:4000/put_player_in_queue', {
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
                const playername = result.username;
                username.current = playername;
                console.log(message);
            }
            else if(response.status === 403){
                const result = await response.text();
                console.log(result);
                alert('Please enable third-party cookies in your browser to use this app')
                navigate('/');
            }
            else if(response.status === 401){
                const result = await response.text();
                console.log(result);
            }
            else{
                const result = await response.text();
                console.log(result);
                alert('Internal Server Error has occurred, please try again later')
            }
        }
        catch(error){
            const message = error.message;
            console.log(message);
            alert('Server is offline, please try again later');
        }
    }

    const availablePlayers = useMemo(() => {
        return queue.map((player) => {
            const currentPlayer = player.player;
            if(username.current === currentPlayer) return;

            const profileImage = player.profileImage;
            const url = profileImage ? convertBase64ToBlobURL(profileImage) : icons['empty avatar'];

            return (               
                <div className={styles.queue_player} key={currentPlayer}>
                    <img className={styles.queue_player_image} src={url}/>
                    <h3>
                        {currentPlayer}
                    </h3>
                    <button>
                        Challenge
                    </button>
                    <button>
                        Decline
                    </button>
                </div>
            )            
        })

    }, [queue])

    useEffect(() => {
        putPlayerInQueue();
    }, [])

    useEffect(() => {
        connectToWebSocket(detectQueueChanges);        
    }, [])

    useEffect(() => {

        const removePlayerFromQueue = () => {
            fetch('http://localhost:4000/leave_queue', {
                method: 'DELETE',
                credentials: 'include',
                keepalive: true
            })
        }

        window.addEventListener('beforeunload', removePlayerFromQueue);

        return () => {
            window.removeEventListener('beforeunload', removePlayerFromQueue);
            leaveQueue && leaveQueue();
        }
    }, [])

    return(
        <section className={styles.queue}>
            <h1 className={styles.queue_title}>
                You have entered the queue
            </h1>
            <h2 className={styles.queue_desc}>
                Looking for other players
            </h2>
            {availablePlayers.length === 0 ? <ClipLoader size={'35px'} color='#CECECE'/> : availablePlayers}
            <button className={styles.queue_button} onClick={handleLeave}>
                Leave Queue
            </button>
        </section>
    )
}

export default FindPlayers;