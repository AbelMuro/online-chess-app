import React, {useState} from 'react';
import {overlayVariant, dialogVariant} from './Variants';
import {useDispatch} from 'react-redux';
import {ClipLoader} from 'react-spinners';
import {motion} from 'framer-motion';
import * as styles from './styles.module.css';

function WaitingForReply({challengeId, waitingForPlayerUsername}) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const username = sessionStorage.getItem('username');

    const handleCancel = async () => {
        try{
            setLoading(true);
            const response = await fetch('https://world-class-chess-server.com/handle_challenge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({challengeId, decision: 'decline', playerResponding: 'playerOne', playerOne: username, playerTwo: waitingForPlayerUsername})
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
        finally{
            setLoading && setLoading(false);
        }
    }


    return(
        <motion.div className={styles.overlay} initial='hidden' animate='show' exit='exit' variants={overlayVariant}>
            <motion.dialog open={true} className={styles.container} initial='hidden' animate='show' exit='exit' variants={dialogVariant}>
                <h2 className={styles.title}>
                    {`Waiting for reply..`}
                </h2>
                <ClipLoader size='30px' color='#CECECE'/>
                <button className={styles.cancel} onClick={handleCancel}>
                    {loading ? <ClipLoader size='25px' color='#CECECE'/> : 'Cancel'}
                </button>
            </motion.dialog>
        </motion.div>

    )
}

export default WaitingForReply;