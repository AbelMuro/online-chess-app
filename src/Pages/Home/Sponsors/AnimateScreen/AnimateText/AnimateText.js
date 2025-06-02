import React, {useRef, useMemo, useEffect} from 'react';
import AnimateLetter from './AnimateLetter';
import {useMotionValue, useAnimationControls, motion} from 'framer-motion';
import * as styles from './styles.module.css';

function AnimateText(){
    const text = useRef('CHESS'.split(''));
    const repeat = useMemo(() => Array.from({length: 15}, (_, i) => i), []);
    const scrollPosition = useMotionValue(0);
    const controls = useAnimationControls();

    useEffect(() => {
        const allScrollContainers = document.querySelectorAll(`.${styles.letter}`);

        allScrollContainers.forEach((container, i) => {
            setTimeout(() => {
                container.scrollTo({top: container.scrollHeight, behavior: 'smooth'})
            }, i * 500)
        })
    }, [])

    useEffect(() => {
        controls.start({x: 160})
    }, [])

    return(
        <h1 className={styles.title}>
            {text.current.map((letter, i) => {
                const repeatedLetters = repeat.map((_, i) => {
                    return(
                        <span key={i}>
                            {letter}
                        </span>
                    )
                })
                return (
                    <div 
                        key={`${letter} ${i}`}
                        className={styles.letter}>
                            {repeatedLetters}
                    </div>
                )
            })}
            <motion.div className={styles.ignore} animate={controls} style={{x: scrollPosition}}/>
        </h1>
    )
}

export default AnimateText;