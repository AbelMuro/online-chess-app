import React, {useState, useContext, useEffect} from 'react';
import WaitingForReply from './WaitingForReply';
import {ClipLoader} from 'react-spinners';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux'; 
import { AnimatePresence } from 'framer-motion';
import { PeerToPeerConnection } from '`/Queue';
import * as styles from './styles.module.css';


//local client


function DisplayPlayer({username, image}) {
    const {initializeConnection, sendMessageToRemoteClient, localClient} = useContext(PeerToPeerConnection);    
    const [waiting, setWaiting] = useState(false);
    const clientUsername = sessionStorage.getItem('username');

    const handleConnection = () => {
        initializeConnection(username)
    }

    useEffect(() => {
        if(localClient !== 'offer') {
            setWaiting(false);
            return;
        };

        sendMessageToRemoteClient({message: {from: clientUsername, action: 'challenge', data: {challenger: clientUsername}}})
        setWaiting(true);
    }, [localClient])    

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

export default DisplayPlayer;