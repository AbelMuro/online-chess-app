import React, {useState, useContext} from 'react';
import {overlayVariant, dialogVariant} from './Variants';
import {useDispatch} from 'react-redux';
import {ClipLoader} from 'react-spinners';
import {motion} from 'framer-motion';
import * as styles from './styles.module.css';
import { PeerToPeerConnection } from '`/FindPlayers';

function WaitingForReply() {
    const {sendMessageToRemoteClient} = useContext(PeerToPeerConnection);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleCancel = async () => {
        sendMessageToRemoteClient.callback(JSON.stringify({message: 'cancel'}))
    }


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