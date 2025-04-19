import React, {useEffect, createContext} from 'react';
import FindPlayers from './FindPlayers';
import * as styles from './styles.module.css';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import DisplayCurrentChallenge from './DisplayCurrentChallenge';
import useWebRTC from '~/Hooks/useWebRTC';

export const PeerToPeerConnection = createContext();

function Queue() {
    const dispatch = useDispatch();
    const navigate = useNavigate();    
    const [
        sendMessageToRemoteClient, 
        sendOfferToRemoteClient, 
        receiveMessageFromRemoteClient, 
        receiveResponseFromRemoteClient,
        localClient, 
        cancelConnection
    ] = useWebRTC();

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
        <PeerToPeerConnection.Provider value={{
                receiveResponseFromRemoteClient,
                sendMessageToRemoteClient, 
                sendOfferToRemoteClient, 
                receiveMessageFromRemoteClient, 
                localClient, 
                cancelConnection}}>
            <DisplayCurrentChallenge/>
            <section className={styles.container}>
                <section className={styles.queue}>
                    <h1 className={styles.queue_title}>
                        You have entered the queue
                    </h1>
                    <FindPlayers/>
                    <button className={styles.queue_button} onClick={handleLeave}>
                        Leave Queue
                    </button>
                </section>  
            </section>        
        </PeerToPeerConnection.Provider>
    )
}

export default Queue;