import React from 'react';
import {useDispatch} from 'react-redux';
import {ClipLoader} from 'react-spinners';
import * as styles from './styles.module.css';

function WaitingForReply({challengeId}) {
    const dispatch = useDispatch();

    const handleCancel = async () => {
        try{
            const response = await fetch('https://world-class-chess-server.com/handle_challenge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({challengeId, decision: 'decline'})
            })
            if(response.status === 200){
                const result = await response.text();
                console.log(result);
                dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Challenge has been cancelled.'}})
            }
            else if(response.status === 404){
                const result = await response.text();
                console.log(result);
                dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Challenger left the queue unexpectedly.'}})
            }
            else{
                const result = await response.text();
                console.log(result);
                dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Internal Server error has occurred, please try again later'}});
            }

        }
        catch(error){
            const message = error.message;
            console.log(message);
            dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Server is offline, please try again later.'}})
        }
    }


    return(
        <div className={styles.overlay}>
            <div className={styles.container}>
                <h2 className={styles.title}>
                    {`Waiting for reply..`}
                </h2>
                <ClipLoader size='30px' color='#CECECE'/>
                <button className={styles.cancel} onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </div>

    )
}

export default WaitingForReply;