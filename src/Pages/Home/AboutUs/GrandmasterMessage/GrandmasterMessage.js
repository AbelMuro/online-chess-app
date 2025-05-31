import React, {useRef} from 'react';
import {useScroll, useMotionValue, useMotionValueEvent} from 'framer-motion';
import * as styles from './styles.module.css';


/* 
    this is where i left off, i am trying to animate text being displayed based on the scroll posiiton
*/
function GrandmasterMessage() {
    const grandmaster = useRef('GRANDMASTER'.split(''))
    const {scrollYProgress} = useScroll();

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        if(value < 0.47 || value > 0.50) return;
    })

    return(
        <section className={styles.container}>
            <p className={styles.grandmaster}>
                {grandmaster.current.map((letter) => {
                    return (
                        <span>
                            {letter}
                        </span>
                    )
                })}
            </p>
            <div className={styles.message}>
                Become a grandmaster today!
            </div>
            <div className={styles.message}>
                Challenge the stockfish engine!
            </div>
            <div className={styles.message}>
                Expand your knowledge!
            </div>  
        </section>
    )
}

export default GrandmasterMessage;