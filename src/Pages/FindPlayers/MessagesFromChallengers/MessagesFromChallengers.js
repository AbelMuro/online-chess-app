import React from "react";
import convertBase64ToBlobURL from '~/assets/functions/convertBase64ToBlobURL.js'
import icons from '~/assets/icons';
import useWebSocket from "~/Hooks/useWebSocket/useWebSocket";
import * as styles from './styles.module.css';


// this is where i left off, 
// i need to create a pop-up feature that displays the username and photo of a challenger
// to do this, i need to connect to the independent websocket for the user

function MessagesFromChallengers({currentPlayer}){
    const [challenge, setChallenge] = useWebSocket(
        `wss://world-class-chess-server.com:443/${currentPlayer}`, 
        (e) => {
            const challenger = JSON.parse(e.data);
            setChallenge(challenger);
        })

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
                        Jackson
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