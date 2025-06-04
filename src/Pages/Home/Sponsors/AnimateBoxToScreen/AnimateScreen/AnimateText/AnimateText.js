import React, {useRef, useMemo, useEffect} from 'react';
import useMediaQuery from '~/Hooks/useMediaQuery';
import AnimateLetter from './AnimateLetter';
import {motion, useAnimationControls} from 'framer-motion';
import * as styles from './styles.module.css';


function AnimateText(){
    const [tablet] = useMediaQuery('(max-width: 960px)');
    const [mobile] = useMediaQuery('(max-width: 600px)');
    const text = useRef('FAQ'.split(''));
    const controls = useAnimationControls();

    useEffect(() => {
        const timeout = setTimeout(() => {
            controls.start('end');
        }, 500)

        return () => {
            clearTimeout(timeout)
        }
    }, [mobile, tablet])



    return(
        <motion.h1 
            className={styles.title} 
            animate={controls} 
            exit={{opacity: 0}}
            variants={{initial: {}, end: {transition: {staggerChildren: 0.2, when: 'beforeChildren', delay: 0.5}}}}>
                {text.current.map((letter, i) => {
                    return (
                        <AnimateLetter 
                            key={`${letter} ${i}`} 
                            letter={letter}
                            />
                    )
                })}
        </motion.h1>
    )
}

export default AnimateText;