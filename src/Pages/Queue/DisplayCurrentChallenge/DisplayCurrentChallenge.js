import React, {useState, useContext, useEffect, memo} from "react";
import { ClipLoader } from "react-spinners";
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import convertBase64ToBlobURL from '~/assets/functions/convertBase64ToBlobURL.js'
import icons from '~/assets/icons';
import * as styles from './styles.module.css';
import { overlayVariants, dialogVariants } from "./Variants/Variants";
import {motion, AnimatePresence} from 'framer-motion';
import { PeerToPeerConnection } from "`/Queue";
import useLocalStorage from '~/Hooks/useLocalStorage';

//remote client

function DisplayCurrentChallenge(){
    const message = useSelector(state => state.webRTC.message);
    const [challenge, setChallenge] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [clientUsername] = useLocalStorage('username');
    if(!clientUsername) {
        navigate('/menu');
        return null;
    } 

    const handleDecision = (decision) => {
        dispatch({type: 'SEND_MESSAGE', payload:{message: {from: clientUsername, action: 'decision', data: {decision}}} })

        if(decision === 'accept'){
            console.log('i need to receive the match id from the remote client here')
        }
        else
            setChallenge(null);
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
        dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Player has canceled the challenge'}});

    }, [message])


/* 
        useEffect(() => {
            if(connection !== 'disconnected') return;

            dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Challenger was disconnected'}});
            setChallenge(null);
        }, [connection])    
*/


    useEffect(() => {
        if(!message) return;
        if(message.from === clientUsername) return;
        if(message.action !== 'match') return;

        const data = message.data;
        const matchId = data.matchId;

        navigate(`/chessboard/${matchId}`);
    }, [message])


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
                            {loading === 'accept' ? <ClipLoader size='30px' color='#CECECE'/> : 'Accept'}
                        </button>     
                        <button onClick={() => {handleDecision('decline')}}>
                            {loading === 'decline' ? <ClipLoader size='30px' color='#CECECE'/> : 'Decline'}
                        </button>          
                    </motion.dialog>
                </motion.div>}
        </AnimatePresence>  
    )

}

export default memo(DisplayCurrentChallenge);