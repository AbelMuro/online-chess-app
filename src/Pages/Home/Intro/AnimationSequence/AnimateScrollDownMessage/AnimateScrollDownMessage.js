import React, {useContext, useRef} from 'react';
import {ThresholdContext} from '../../Intro';
import {useScroll, motion, useTransform, useMotionValueEvent} from 'framer-motion';
import icons from './icons';
import * as styles from './styles.module.css';

function AnimateScrollDownMessage() {
    const containerRef = useRef();
    const {topThreshold} = useContext(ThresholdContext);
    const {scrollYProgress} = useScroll();
    const opacity = useTransform(scrollYProgress, [topThreshold, topThreshold + 0.15], [1, 0]);

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        if(value <= topThreshold + 0.15)
            containerRef.current.style.display = 'flex';
        else
            containerRef.current.style.display = 'none';
    
    })

    return(
        <motion.h2 className={styles.message} style={{opacity}} ref={containerRef}>
            Scroll Down
            <motion.img 
                initial={{y: 0}}
                animate={{y: [0, 10, 20, 10, 0]}}
                transition={{duration: 1.5, repeat: Infinity, repeatType: 'loop'}}
                className={styles.arrow} 
                src={icons['arrowDown']}/>
        </motion.h2>
    )
}

export default AnimateScrollDownMessage