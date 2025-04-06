import React from 'react';
import {ClipLoader} from 'react-spinners';
import * as styles from './styles.module.css';

function WaitingForReply() {
    return(
        <div className={styles.container}>
            <h2 className={styles.title}>
                Waiting for reply..
            </h2>
            <ClipLoader size='30px' color='#CECECE'/>
            <button className={styles.cancel}>

            </button>
        </div>
    )
}

export default WaitingForReply;