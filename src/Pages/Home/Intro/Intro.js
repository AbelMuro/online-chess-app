import React from 'react';
import AnimationSequence from './AnimationSequence';
import * as styles from './styles.module.css';


function Intro() {
    return(
        <header className={styles.container}>
            <AnimationSequence/>
        </header>
    )
}

export default Intro;