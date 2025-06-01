import React from 'react';
import AnimateLine from './AnimateLine';
import * as styles from './styles.module.css';

function IndividualMessage({message, upperThreshold, lowerThreshold}){
    return(
        <div className={styles.message}>
            {message}
            <AnimateLine upperThreshold={upperThreshold} lowerThreshold={lowerThreshold}/>
        </div>
    )
}

export default IndividualMessage;