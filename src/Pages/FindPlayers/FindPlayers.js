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
    const [queue, setQueue] = useQueue();
    const navigate = useNavigate();

    const handleCreateMatch = async () => {
        const matchId = Array.from({length: 10}, () => null).reduce((acc) => {acc += Math.floor(Math.random() * 9); return acc}, '');

        try{
            const response = await fetch('https://world-class-chess-server.netlify.app/create_match', {
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

        if(operation ===  'insert'){
            const _id = change?.fullDocument?._id;
            const currentQueue = [change.fullDocument, ...queue];
            const queueWithoutCurrentPlayer = currentQueue.filter((player) => player._id !== _id);
            setQueue(queueWithoutCurrentPlayer);             
        }

        else{
            const _id = change.documentKey._id;
            setQueue((queue) => queue.filter((player) => player._id !== _id))            
        }    
    }


    const handleLeave = () => {
        const choice = confirm('Are you sure you want to leave queue?');

        if(choice)
            leaveQueue();
    }

    const leaveQueue = async () => {
        try{
            const response = await fetch('https://world-class-chess-server.netlify.app/leave_queue', {
                method: 'DELETE',
                credentials: 'include',
                keepalive: true,
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
            const response = await fetch('https://world-class-chess-server.netlify.app/put_player_in_queue', {
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
            if(message.includes('Failed to fetch'))
                console.log('Too many requests were made')
            else
                alert('Server is offline, please try again later');
        }
    }

    const availablePlayers = useMemo(() => {
        return queue.map((player) => {
            const currentPlayer = player.player;
            const _id = player._id;
            const profileImageBase64 = player.profileImageBase64;
            const contentType = player.contentType;
            const url = profileImageBase64 ? convertBase64ToBlobURL(profileImageBase64, contentType) : icons['empty avatar'];

            return (               
                <DisplayChallenger currentPlayer={currentPlayer} image={url} playerId={_id}/>
            )            
        })

    }, [queue])

    useEffect(() => {
        putPlayerInQueue();
    }, [])


    useEffect(() => {

        const removePlayerFromQueue = () => {
            fetch('https://world-class-chess-server.netlify.app/leave_queue', {
                method: 'DELETE',
                credentials: 'include',
                keepalive: true
            })                
        }

        window.addEventListener('beforeunload', removePlayerFromQueue);

        return () => {
            window.removeEventListener('beforeunload', removePlayerFromQueue);
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