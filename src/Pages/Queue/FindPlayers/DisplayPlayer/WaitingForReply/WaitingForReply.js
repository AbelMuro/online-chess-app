import React, {useState, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {overlayVariant, dialogVariant} from './Variants';
import {useDispatch} from 'react-redux';
import {ClipLoader} from 'react-spinners';
import {motion} from 'framer-motion';
import * as styles from './styles.module.css';
import { PeerToPeerConnection } from '`/Queue';

//local client

function WaitingForReply({setWaiting}) {
    const navigate = useNavigate();
    const {cancelConnection, receiveResponseFromRemoteClient} = useContext(PeerToPeerConnection);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleCancel = async () => {
        cancelConnection();
    }

    useEffect(() => {
        if(!receiveResponseFromRemoteClient) return;

        const decision = receiveResponseFromRemoteClient.decision;

        if(decision === 'decline'){
            handleCancel();
            setWaiting(false);
        }
        else{
            console.log('now we create a match in a fetch request')
        }
            
    }, [receiveResponseFromRemoteClient])


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