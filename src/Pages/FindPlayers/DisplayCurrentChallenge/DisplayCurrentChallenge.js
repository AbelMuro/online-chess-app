import React, {useState, useEffect} from "react";
import { ClipLoader } from "react-spinners";
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import convertBase64ToBlobURL from '~/assets/functions/convertBase64ToBlobURL.js'
import icons from '~/assets/icons';
import useWebSocket from "~/Hooks/useWebSocket/useWebSocket";
import * as styles from './styles.module.css';
import ConnectToWebSocket from '~/assets/functions/ConnectToWebSocket.js';
import { overlayVariants, dialogVariants } from "./Variants/Variants";
import {motion, AnimatePresence} from 'framer-motion';

//this is where i left off, i need to debug these components further

//if the challenger leaves the session, then i have to notify the challenged payer that the challenger has declined
//if the challenged player leaves the queue, then i have to notify the challenger that the challenged player declined
// leaving the queue means a few things here; closing the session, clicking the back button, closing the browser

//i may also need to organize the code a bit here

//also test out the app when player A sends a challenge to player B, 
// player A should cancel the challenge
// then player B should decline
// then make player A leave the queue and see if the queue is updated in Player B screen
// i may need to debug the challenge websocket somehow


const callbackForChallengeWebSocket = (navigate, dispatch, setChallenger) => {

    return function (e) {
        const result = JSON.parse(e.data);
        if(!result) return;
        const message = result.message;
        const matchId = result.matchId;
        const playerWhoDeclined = result.playerWhoDeclined;
        const username = sessionStorage.getItem('username');

        if(message === 'initiate match'){
            console.log('initiate match');
            this.close();
            navigate(`/chessboard/${matchId}`, {state: {matchId}});
        }
            
        else if(message === 'decline match'){
            console.log('declined');
            if(playerWhoDeclined !== username)
                dispatch({type: 'DISPLAY_MESSAGE', payload: {message: `${playerWhoDeclined} has cancelled the challenge`}});
            this.close();
            setChallenger(null);
        }
    }
}


function DisplayCurrentChallenge(){
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const username = sessionStorage.getItem('username');
    if(!username) {
        navigate('/menu');
        return null;
    } 
    const [challenger, setChallenger] = useWebSocket(                                                                               //user websocket
        `wss://world-class-chess-server.com:443/${username}`, 
        (e) => {
            const challenger = JSON.parse(e.data);
            if(!challenger) return;
            const challengeId = challenger.challengeId;
            setChallenger(challenger);
            ConnectToWebSocket(`wss://world-class-chess-server.com:443/${challengeId}`, callbackForChallengeWebSocket(navigate, dispatch ,setChallenger))    //challenge websocket
        }, null)


    const handleChallenge = async (decision) => {
        if(!challenger) return;

        try{
            const response = await fetch('https://world-class-chess-server.com/handle_challenge', {    //if the challenged player accepts the challenge, then a new match will be created in the Match collection
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({challengeId: challenger.challengeId, decision, playerResponding: 'playerTwo', playerOne: challenger.username, playerTwo: username})
            })

            if(response.status === 200){
                const result = await response.text();
                console.log(result);
            }
            else if(response.status === 404){
                const result = await response.text();
                console.log(result);
                dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Challenger left the queue'}});
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
        finally{
            setLoading && setLoading(false);
            setChallenger && setChallenger(null);
        }
    }


    const loadImage = () => {
        if(challenger.imageBase64)
            return convertBase64ToBlobURL(challenger.imageBase64, challenger.imageContentType);
        else
            return icons['empty avatar'];
    }


    return (
        <AnimatePresence>
            {challenger && 
                <motion.div className={styles.overlay} initial='hidden' animate='show' exit='exit' variants={overlayVariants}>
                    <motion.dialog className={styles.dialog} open={true} initial='hidden' animate='show' exit='exit' variants={dialogVariants}>
                        <h1>
                            {`You have been challenged by: `}
                        </h1>
                        <div className={styles.display_challenger}>
                            <img src={loadImage()}/>
                            <h2>
                                {challenger.username}
                            </h2>
                        </div>    
                        <button onClick={() => {setLoading('accept'); handleChallenge('accepted')}}>
                            {loading === 'accept' ? <ClipLoader size='30px' color='#CECECE'/> : 'Accept'}
                        </button>     
                        <button onClick={() => {setLoading('decline'); handleChallenge('decline')}}>
                            {loading === 'decline' ? <ClipLoader size='30px' color='#CECECE'/> : 'Decline'}
                        </button>          
                    </motion.dialog>
                </motion.div>}
        </AnimatePresence>  
    )

}

export default DisplayCurrentChallenge;