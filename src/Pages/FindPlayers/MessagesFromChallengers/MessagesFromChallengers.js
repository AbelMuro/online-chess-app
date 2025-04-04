import React, {useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import convertBase64ToBlobURL from '~/assets/functions/convertBase64ToBlobURL.js'
import icons from '~/assets/icons';
import useWebSocket from "~/Hooks/useWebSocket/useWebSocket";
import * as styles from './styles.module.css';
import ConnectToWebSocket from '~/assets/functions/ConnectToWebSocket.js'

//when a player is challenged, they will be connected to a websocket that detects changes to a 'Challenge' document

const callbackForChallengeWebSocket = function(navigate) {

    return (e) => {
        const result = JSON.parse(e.data);
        const message = result.message;
        const matchId = result.matchId;

        if(message === 'initiate match'){
            console.log('initiate match');
            this.close();
            navigate('/chessboard', {state: {matchId}});
        }
            
        else if(message.includes('decline')){
            console.log('declined')
            //i need to disconnect the front-end from the websocket server here
        }
    }
}


function MessagesFromChallengers(){
    const navigate = useNavigate();
    const username = sessionStorage.getItem('username');
    if(!username) {
        navigate('/menu');
        return null;
    } 
    const [challenger, setChallenger] = useWebSocket(
        `wss://world-class-chess-server.com:443/${username}`, 
        (e) => {
            const challenger = JSON.parse(e.data);
            const challengeId = challenger.challengeId;
            setChallenger(challenger);
            ConnectToWebSocket(`wss://world-class-chess-server.com:443/${challengeId}`, callbackForChallengeWebSocket(navigate))
        }, null)

    const handleChallenge = async (decision) => {
        try{
            const response = await fetch('https://world-class-chess-server.com/handle_challenge', {    //if the challenged player accepts the challenge, then a new match will be created in the Match collection
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({challengeId: challenger.challengeId, decision})
            })

            if(response.status === 200){
                const result = await response.text();
                console.log(result);
            }
            else{
                const result = await response.text();
                console.log(result);
                dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Internal Server Error has occurred, please try again later.'}});
            }
        }
        catch(error){
            const message = error.message;
            console.log(message);
            dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Server is offline, please try again later.'}});
        }
    }


    const loadImage = () => {
        if(challenger.imageBase64)
            return convertBase64ToBlobURL(challenger.imageBase64, challenger.imageContentType);
        else
            return icons['empty avatar'];
    }

    useEffect(() => {
        const beforeUnload = () => {handleChallenge('decline')};

        window.addEventListener('beforeunload', beforeUnload);

        return () => {
            window.removeEventListener('beforeunload', beforeUnload);
            beforeUnload && beforeUnload();
        }
    }, [])

    return challenger && (
        <div className={styles.overlay}>
            <dialog className={styles.dialog} open={true}>
                <h1>
                    {`You have been challenged by: `}
                </h1>
                <div className={styles.display_challenger}>
                    <img src={loadImage()}/>
                    <h2>
                        {challenger.username}
                    </h2>
                </div>    
                <button onClick={() => handleChallenge('accepted')}>
                    Accept
                </button>     
                <button onClick={() => handleChallenge('decline')}>
                    Decline
                </button>          
            </dialog>
        </div>
    )
}

export default MessagesFromChallengers;