import React, {useEffect} from 'react';
import FindPlayers from './FindPlayers';
import * as styles from './styles.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import DisplayCurrentChallenge from './DisplayCurrentChallenge';
import {initiateWebRTC} from '!/WebRtcReducer'

function Queue() {
    const dispatch = useDispatch();
    const navigate = useNavigate();   
    const connected = useSelector(state => state.webRTC.connected)
     
    const handleLeave = () => {
        if(confirm('Are you sure you wish to leave?'))
            navigate('/menu');
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
                dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Please enable third-party cookies in your browser to use this app'}})
                navigate('/');
            }
            else if(response.status === 401){
                const result = await response.text();
                console.log(result);
            }
            else{
                const result = await response.text();
                console.error('Internal Server Error has occurred in this endpoint /put_player_in_queue ', result);
                dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Internal Server Error has occurred, please try again later.'}})
            }
        }
        catch(error){
            const message = error.message;
            console.error('Server went offline in this endpoint /put_player_in_queue ', message);
            dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Server is offline, please try again later'}})
        }
    }


    useEffect(() => {
        putPlayerInQueue();
    }, [])

    useEffect(() => {
        console.log('initiating web RTC..')
        console.log(connected);
        dispatch(initiateWebRTC())
    }, [connected])

    return(
        <>
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
        </>
    )
}

export default Queue;