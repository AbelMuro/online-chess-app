import React, {useEffect} from 'react';
import AnimationSequence from './AnimationSequence';
import * as styles from './styles.module.css';

function Intro() {

    useEffect(() => {
        window.history.scrollRestoration = "manual";
        window.onload = () => {
           window.scrollTo({top: 0, behavior: 'instant'}); 
        }
    }, [])

    return(
        <section className={styles.container}>
            <AnimationSequence/>
        </section>
    )
}

export default Intro;