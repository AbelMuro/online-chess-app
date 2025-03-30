import React from "react";
import {useNavigate} from 'react-router-dom';
import convertBase64ToBlobURL from '~/assets/functions/convertBase64ToBlobURL.js'
import icons from '~/assets/icons';
import useWebSocket from "~/Hooks/useWebSocket/useWebSocket";
import * as styles from './styles.module.css';


function MessagesFromChallengers(){
    const navigate = useNavigate();
    const username = sessionStorage.getItem('username');
    console.log(username);
    if(!username) {
        navigate('/menu');
        return null;
    } 
    const [challenge, setChallenge] = useWebSocket(
        `wss://world-class-chess-server.com:443/${username}`, 
        (e) => {
            const challenger = JSON.parse(e.data);
            setChallenge(challenger);
        }, null)

    const handleAccept = async () => {

    }

    const handleDecline = () => {

    }

    const loadImage = () => {
        if(challenge.imageBase64)
            return convertBase64ToBlobURL(challenge.imageBase64, challenge.imageContentType);
        else
            return icons['empty avatar'];
    }

    return challenge && (
        <div className={styles.overlay}>
            <dialog className={styles.dialog} open={true}>
                <h1>
                    {`You have been challenged by: `}
                </h1>
                <div className={styles.display_challenger}>
                    <img src={loadImage()}/>
                    <h2>
                        {username}
                    </h2>
                </div>    
                <button onClick={handleAccept}>
                    Accept
                </button>     
                <button onClick={handleDecline}>
                    Decline
                </button>          
            </dialog>
        </div>
    )
}

export default MessagesFromChallengers;