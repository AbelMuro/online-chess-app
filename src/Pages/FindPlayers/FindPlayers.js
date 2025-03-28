import React, {useEffect, useMemo, useState} from 'react';
import DisplayChallenger from './DisplayChallenger';
import {useSelector} from 'react-redux';
import * as styles from './styles.module.css';
import {useNavigate} from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import icons from '~/assets/icons';
import convertBase64ToBlobURL from '~/assets/functions/convertBase64ToBlobURL.js';
import useQueue from '~/Hooks/useQueue';

function FindPlayers() {
    const board = useSelector(state => state.chess.board);
    const [currentPlayer, setCurrentPlayer] = useState('');
    const [queue, setQueue] = useQueue();
    const navigate = useNavigate();

    const handleCreateMatch = async () => {
        const matchId = Array.from({length: 10}, () => null).reduce((acc) => {acc += Math.floor(Math.random() * 9); return acc}, '');

        try{
            const response = await fetch('https://world-class-chess-server.com/create_match', {
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
            alert(message);
        }
    }


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
            alert(message);
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
                const username = result.username;
                setCurrentPlayer(username);
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
            alert(message);
        }
    }

    const availablePlayers = useMemo(() => {
        const newQueue = [];

        for(let i = 0; i < queue.length; i++){
            if(queue[i].player === currentPlayer) continue;

            const playerInQueue = queue[i].player;
            const profileImageBase64 = queue[i].profileImageBase64;
            const contentType = queue[i].contentType;
            const url = profileImageBase64 ? convertBase64ToBlobURL(profileImageBase64, contentType) : icons['empty avatar'];

            newQueue.push(<DisplayChallenger username={playerInQueue} image={url}/>)                
        }

        return newQueue;

    }, [queue, currentPlayer])

    useEffect(() => {
        putPlayerInQueue();
    }, [])

    useEffect(() => {
       const removePlayerFromQueue = () => {
        fetch('https://world-class-chess-server.com/leave_queue', {
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
            {availablePlayers.length === 0 && <h2 className={styles.queue_desc}>
                Looking for other players
            </h2>}
            {availablePlayers.length === 0 ? <ClipLoader size={'35px'} color='#CECECE'/> : availablePlayers}
            <button className={styles.queue_button} onClick={handleLeave}>
                Leave Queue
            </button>
        </section>
    )
}

export default FindPlayers;