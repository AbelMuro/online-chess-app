import React, {useState, memo, useEffect} from 'react';
import WaitingForReply from './WaitingForReply';
import {useDispatch, useSelector} from 'react-redux'; 
import { AnimatePresence } from 'framer-motion';
import * as styles from './styles.module.css';

//local client

function DisplayPlayer({username, image}) {
    const dispatch = useDispatch();
    const clientUsername = useSelector(state => state.account.username);
    const connectionEstablished = useSelector(state => state.webRTC.connectionEstablished);
    const [waiting, setWaiting] = useState(false);  

    const handleConnection = async () => {
        setWaiting(true);
        try{
            
            const response = await fetch('https://world-class-chess-server.com/challenge_player_in_queue', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username})
            });

            if(response.status === 200){   
                dispatch({type: 'SET_REMOTE_CLIENT_USERNAME', payload: {username}})
                dispatch({type: 'START_CONNECTION'});
            }
            else if(response.status === 404){
                const message = await response.text();
                console.log(message);
                dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Player is no longer in the queue'}})
                setWaiting(false);
            }
            else if(response.status === 403){
                const message = await response.text();
                console.log(message);
                dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Player is currently being challenged by another player'}});
                setWaiting(false);
            }
        }
        catch(error){
            const message = error.message;
            console.log(message);
            dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Server is offline, please try again later'}})
            setWaiting(false);
        }
    }

    useEffect(() => {
        if(!connectionEstablished || !waiting) return;
        dispatch({type: 'SET_LOCAL_MESSAGE', payload: {message: {from: clientUsername, action: 'challenge', data: {challenger: clientUsername}}}});
        dispatch({type: 'CONNECTION_ESTABLISHED', payload: {connection: false}});
    }, [connectionEstablished, waiting])

    return(    
        <>
            <AnimatePresence>
                {waiting && <WaitingForReply setWaiting={setWaiting} username={username}/>}
            </AnimatePresence>
            <div className={styles.queue_player} key={username}>
                <img className={styles.queue_player_image} src={image}/>
                <h3>
                    {username}
                </h3>
                <button onClick={handleConnection} className={styles.queue_button}>
                    Challenge
                </button>
            </div>        
        </>           
    )
}

export default memo(DisplayPlayer);