import React, {useState, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {overlayVariant, dialogVariant} from './Variants';
import {useDispatch} from 'react-redux';
import {ClipLoader} from 'react-spinners';
import {motion} from 'framer-motion';
import * as styles from './styles.module.css';
import { PeerToPeerConnection } from '`/Queue';

//local client

//this is where i left off, i will need to display a message to the challenger when the challengedplayer declines, 
//but not when the challenger cancels the match
//then i will need to make a fetch request to a route that will create a match, i need to pass the match id to the remote client from <WaitingForReply/>
//DONT FORGET TO UPDATE NOTES FOR WEBRTC IN NODE.JS SECTION OF YOUR NOTES REPOSITORY

//everything works now, i refactored the useWebRTC hook

function WaitingForReply({setWaiting}) {
    const navigate = useNavigate();
    const {cancelConnection, receiveMessageFromRemoteClient, connected} = useContext(PeerToPeerConnection);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleCancel = async () => {
        cancelConnection();
    }

    useEffect(() => {
        if(connected !== 'disconnected') return;

        setWaiting(false);
        dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Player declined'}});
    }, [connected])



    useEffect(() => {
        if(!receiveMessageFromRemoteClient || !receiveMessageFromRemoteClient.decision) return;
        const decision = receiveMessageFromRemoteClient.decision;

        if(decision === 'decline'){
            handleCancel();
            setWaiting(false);
            dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Player declined'}});
        }
        else
            console.log('now we create a match in a fetch request');
        
    }, [receiveMessageFromRemoteClient])


    return(
        <motion.div className={styles.overlay} initial='hidden' animate='show' exit='exit' variants={overlayVariant}>
            <motion.dialog open={true} className={styles.container} initial='hidden' animate='show' exit='exit' variants={dialogVariant}>
                <h2 className={styles.title}>
                    {`Waiting for their reply..`}
                </h2>
                <ClipLoader size='30px' color='#CECECE'/>
                <button className={styles.cancel} onClick={handleCancel}>
                    {loading ? <ClipLoader size='25px' color='#CECECE'/> : 'Cancel'}
                </button>
            </motion.dialog>
        </motion.div>

    )
}

export default WaitingForReply;