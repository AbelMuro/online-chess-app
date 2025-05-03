import React, {useState, memo} from 'react';
import WaitingForReply from './WaitingForReply';
import {useDispatch, useSelector} from 'react-redux'; 
import {createLocalDataChannel, sendOffer} from '!/WebRtcReducer';
import { AnimatePresence } from 'framer-motion';
import * as styles from './styles.module.css';

//local client

function DisplayPlayer({username, image}) {
    const dispatch = useDispatch();
    const clientUsername = useSelector(state => state.account.username);
    const [waiting, setWaiting] = useState(false);  

    const handleConnection = async () => {
        setWaiting(true);
        await dispatch(createLocalDataChannel())
        await dispatch(sendOffer(username))
        dispatch({type: 'SEND_MESSAGE', payload: {message: {from: clientUsername, action: 'challenge', data: {challenger: clientUsername}}}})
    }

    return(    
        <>
            <AnimatePresence>
                {waiting && <WaitingForReply setWaiting={setWaiting}/>}
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