import React from 'react';
import AnimationSequence from './AnimationSequence';
import * as styles from './styles.module.css';

function Intro() {

    return(
        <section className={styles.container}>
            <AnimationSequence/>
        </section>
    )
}

export default Intro;