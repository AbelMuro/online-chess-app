import React, {useState, useContext} from 'react';
import WaitingForReply from './WaitingForReply';
import {ClipLoader} from 'react-spinners';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux'; 
import { AnimatePresence } from 'framer-motion';
import { PeerToPeerConnection } from '`/FindPlayers';
import * as styles from './styles.module.css';


function DisplayPlayer({username, image}) {
    const [loading, setLoading] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {sendOfferToClient} = useContext(PeerToPeerConnection);

    const handleConnection = () => {
        sendOfferToClient.callback(JSON.stringify(username));    
    }

    return(    
        <>
            <AnimatePresence>
                {waiting && <WaitingForReply challengeId={waiting} waitingForPlayerUsername={username}/>}
            </AnimatePresence>
            <div className={styles.queue_player} key={username}>
                <img className={styles.queue_player_image} src={image}/>
                <h3>
                    {username}
                </h3>
                <button onClick={handleConnection} className={styles.queue_button}>
                    {loading ? <ClipLoader size='30px' color='#CECECE'/> : 'Challenge'}
                </button>
            </div>        
        </>           
    )
}

export default DisplayPlayer;