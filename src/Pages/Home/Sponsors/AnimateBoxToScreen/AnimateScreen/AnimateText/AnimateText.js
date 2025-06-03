import React, {useRef, useMemo, useEffect} from 'react';
import AnimateLetter from './AnimateLetter';
import {motion, useAnimationControls} from 'framer-motion';
import * as styles from './styles.module.css';


function AnimateText(){
    const text = useRef('CHESS'.split(''));
    const words = useRef(['heckmate'.split(''), 'eart'.split(''), 'legance'.split(''), 'tragedy'.split(''), 'acrifice'.split('')]);
    const repeat = useMemo(() => Array.from({length: 5}, (_, i) => i), []);
    const controls = useAnimationControls();

    useEffect(() => {
        const timeout = setTimeout(() => {
            controls.start('end');
        }, 500)

        return () => {
            clearTimeout(timeout)
        }
    }, [])

    return(
        <motion.h1 
            className={styles.title} 
            animate={controls} 
            exit={{opacity: 0}}
            initial={{opacity: 0}}
            variants={{initial: {opacity: 0}, end: {opacity: 1, transition: {staggerChildren: 0.2, when: 'beforeChildren', delay: 0.5}}}}>
                {text.current.map((letter, i) => {
                    const repeatedLetters = repeat.map((_, i) => {
                        return(
                            <span key={i}>
                                {letter}
                            </span>
                        )
                    })
                    return (
                        <AnimateLetter 
                            key={`${letter} ${i}`} 
                            repeatedLetters={repeatedLetters} 
                            letter={letter}
                            word={words.current[i]}
                            />
                    )
                })}
        </motion.h1>
    )
}

export default AnimateText;