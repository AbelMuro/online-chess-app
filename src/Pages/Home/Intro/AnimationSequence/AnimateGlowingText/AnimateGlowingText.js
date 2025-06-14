import React, {useRef, useContext} from 'react';
import { ThresholdContext } from '../../Intro';
import {motion, useScroll, useMotionValueEvent, useTransform} from 'framer-motion';
import * as styles from './styles.module.css';

function AnimateGlowingText() {
    const {topThreshold} = useContext(ThresholdContext);
    const {scrollYProgress} = useScroll();
    const opacity = useTransform(scrollYProgress, [topThreshold + 0.38, topThreshold + 0.40], [0, 1])
    const container = useRef();

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        const remove = topThreshold + 0.38

        if(value < remove) 
            container.current.style.display = 'none';
        else
            container.current.style.display = 'block'
    })  

    return(
        <motion.div className={styles.container} style={{opacity}} ref={container}>
            <motion.p className={styles.text}>
                {`[About Us]`}
            </motion.p>
            <motion.p className={styles.glow}>
                {`[About Us]`}
            </motion.p>    
        </motion.div>
    )
}

export default AnimateGlowingText;