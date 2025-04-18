import React, {useState, useContext, useEffect} from 'react';
import WaitingForReply from './WaitingForReply';
import {ClipLoader} from 'react-spinners';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux'; 
import { AnimatePresence } from 'framer-motion';
import { PeerToPeerConnection } from '`/Queue';
import * as styles from './styles.module.css';


//local client

//this is where i left off, there is a limit to the size of the data that i can send in WebRTC, i can only send the username for now
//the connection works now, i can send data now, but the remote client is not receiving the data
//also, try to find a way to refactor the useWebRTC hook and test out the peerConnection.ondatachannel()
//DONT FORGET TO UPDATE NOTES FOR WEBRTC IN NODE.JS SECTION OF YOUR NOTES REPOSITORY

//everything should work, just test everything out

function DisplayPlayer({username, image}) {
    const {sendOfferToRemoteClient, sendMessageToRemoteClient, localClient} = useContext(PeerToPeerConnection);    
    const [waiting, setWaiting] = useState(false);
    const clientUsername = sessionStorage.getItem('username');

    const handleConnection = () => {
        sendOfferToRemoteClient(username);   
    }

    useEffect(() => {
        if(localClient !== 'offer') {
            setWaiting(false);
            return
        };

        sendMessageToRemoteClient({challenger: clientUsername, challengedPlayer: username})
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