import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import * as styles from './styles.module.css';
import {useNavigate} from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import connectToWebSocket from '~/assets/functions/connectToWebSocket.js';

//this is where i left off, i need to get the data from the queue collection and create a UI that asks the user if they want to have a match with a specific person in the queue
//i also need to create a route in node.js that removes the user from the queue if they decide to leave the queue
//and dont forget to update notes on web sockets on mongoDB

function FindPlayers() {
    const board = useSelector(state => state.chess.board);
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
        setQueue(change?.fullDocument); 
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
                const result = await response.text();
                console.log(result);
            }
            else if(response.status === 403){
                const result = await response.text();
                console.log(result);
                alert('Please enable third-party cookies in your browser to use this app')
                navigate('/');
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

    useEffect(() => {
        putPlayerInQueue();
    }, [])

    useEffect(() => {
        connectToWebSocket(detectQueueChanges);
        return leaveQueue;
    }, [])

    return(
        <section className={styles.queue}>
            <h1 className={styles.queue_title}>
                You have entered the queue
            </h1>
            <h2 className={styles.queue_desc}>
                Looking for other players
            </h2>
            <ClipLoader size={'35px'} color='#CECECE'/>
            <button className={styles.queue_button} onClick={handleLeave}>
                Leave Queue
            </button>
        </section>
    )
}

export default FindPlayers;