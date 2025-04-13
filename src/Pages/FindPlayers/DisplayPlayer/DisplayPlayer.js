import React, {useState, useContext, useEffect} from 'react';
import WaitingForReply from './WaitingForReply';
import {ClipLoader} from 'react-spinners';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux'; 
import { AnimatePresence } from 'framer-motion';
import { PeerToPeerConnection } from '`/FindPlayers';
import * as styles from './styles.module.css';


function DisplayPlayer({username, image, profileImageBase64, contentType}) {
    const {sendOfferToRemoteClient, sendMessageToRemoteClient, localClient} = useContext(PeerToPeerConnection);    
    const [waiting, setWaiting] = useState(false);

    const handleConnection = () => {
        sendOfferToRemoteClient(username);   
    }

    useEffect(() => {
        console.log(localClient);
        if(localClient !== 'offer') {
            setWaiting(false);
            return
        };

        sendMessageToRemoteClient({username, profileImageBase64, contentType})
        setWaiting(true);
    }, [localClient])


    return(    
        <>
            <AnimatePresence>
                {waiting && <WaitingForReply/>}
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