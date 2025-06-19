import React, {useState, useEffect, memo} from "react";
import { ClipLoader } from "react-spinners";
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import convertBase64ToBlobURL from '~/Common/Functions/convertBase64ToBlobURL.js'
import icons from '~/assets/icons';
import * as styles from './styles.module.css';
import { overlayVariants, dialogVariants } from "./Variants/Variants";
import {motion, AnimatePresence} from 'framer-motion';


function DisplayCurrentChallenge(){
    const message = useSelector(state => state.webRTC.remoteMessage);
    const error = useSelector(state => state.webRTC.error);
    const [challenge, setChallenge] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const clientUsername = useSelector(state => state.account.username);

    const handleDecision = (decision) => {
        setLoading(true);
        dispatch({type: 'SET_LOCAL_MESSAGE', payload: {message: {from: clientUsername, action: 'decision', data: {decision}}} })

        if(decision === 'decline'){
            setChallenge(null);
            setLoading(false);
        }    
    }

    const loadImage = () => {
        if(challenge.imageBase64)
            return convertBase64ToBlobURL(challenge.imageBase64, challenge.contentType);
        else
            return icons['empty avatar'];
    }
    
    useEffect(() => {
        if(!message) return;
        if(message.from === clientUsername) return;
        if(message.action !== 'challenge') return;

        const data = message.data;
        const challenger = data.challenger;
        setChallenge({challenger});

    }, [message])

    useEffect(() => {
        if(!message) return;
        if(message.from === clientUsername) return;
        if(message.action !== 'cancel') return;

        setChallenge(null);
        dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Player has canceled the challenge'}}); 
        dispatch({type: 'REINITIATE_WEBRTC', payload: {initiate: true}});

    }, [message])

    useEffect(() => {
        if(!message) return;
        if(message.from === clientUsername) return;
        if(message.action !== 'match') return;

        const data = message.data;
        const matchId = data.matchId;
        navigate(`/chessboard/${matchId}`);
    }, [message])

    useEffect(() => {
        if(!error) return;
        
        console.log('error has occurred inside use effect dusplaycurrent challenge')
        setChallenge(null);
        dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: error}});
        dispatch({type: 'REINITIATE_WEBRTC', payload: {initiate: true}});    
        fetch('https://world-class-chess-server.com/cancel_challenge', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: clientUsername})
        });    
    }, [error])    

    return (
        <AnimatePresence>
            {challenge && 
                <motion.div className={styles.overlay} initial='hidden' animate='show' exit='exit' variants={overlayVariants}>
                    <motion.dialog className={styles.dialog} open={true} initial='hidden' animate='show' exit='exit' variants={dialogVariants}>
                        <h1>
                            {`You have been challenged by: `}
                        </h1>
                        <div className={styles.display_challenger}>
                            {/* <img src={loadImage()}/> */}
                            <h2>
                                {challenge.challenger}
                            </h2>
                        </div>    
                        <button onClick={() => {handleDecision('accept')}}>
                            {loading ? <ClipLoader size='30px' color='#CECECE'/> : 'Accept'}
                        </button>     
                        <button onClick={() => {handleDecision('decline')}}>
                            Decline
                        </button>          
                    </motion.dialog>
                </motion.div>}
        </AnimatePresence>  
    )

}

export default memo(DisplayCurrentChallenge);