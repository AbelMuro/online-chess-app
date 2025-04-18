import React, {useState, useContext, useEffect, memo} from "react";
import { ClipLoader } from "react-spinners";
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import convertBase64ToBlobURL from '~/assets/functions/convertBase64ToBlobURL.js'
import icons from '~/assets/icons';
import * as styles from './styles.module.css';
import { overlayVariants, dialogVariants } from "./Variants/Variants";
import {motion, AnimatePresence} from 'framer-motion';
import { PeerToPeerConnection } from "`/Queue";

//remote client

function DisplayCurrentChallenge(){
    const [challenger, setChallenger] = useState();
    const {sendMessageToRemoteClient, receiveMessageFromRemoteClient} = useContext(PeerToPeerConnection);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const username = sessionStorage.getItem('username');
    if(!username) {
        navigate('/menu');
        return null;
    } 

    const handleDecision = (decision) => {
        sendMessageToRemoteClient(JSON.stringify({message: decision}))
    }

    const loadImage = () => {
        if(challenger.imageBase64)
            return convertBase64ToBlobURL(challenger.imageBase64, challenger.contentType);
        else
            return icons['empty avatar'];
    }
    

    useEffect(() => {
        if(!receiveMessageFromRemoteClient) return;

        const username = receiveMessageFromRemoteClient.username;

        setChallenger({username})
    }, [receiveMessageFromRemoteClient])



    return (
        <AnimatePresence>
            {challenger && 
                <motion.div className={styles.overlay} initial='hidden' animate='show' exit='exit' variants={overlayVariants}>
                    <motion.dialog className={styles.dialog} open={true} initial='hidden' animate='show' exit='exit' variants={dialogVariants}>
                        <h1>
                            {`You have been challenged by: `}
                        </h1>
                        <div className={styles.display_challenger}>
                            {/* <img src={loadImage()}/> */}
                            <h2>
                                {challenger.username}
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