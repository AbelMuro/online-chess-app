import React from 'react';
import AnimateLine from './AnimateLine';
import * as styles from './styles.module.css';

function IndividualMessage({message, animationStart}){
    return(
        <div className={styles.message}>
            {message}
            <AnimateLine animationStart={animationStart}/>
        </div>
    )
}

export default IndividualMessage;