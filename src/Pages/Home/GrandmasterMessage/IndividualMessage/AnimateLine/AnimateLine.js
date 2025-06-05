import React from 'react';
import {useScroll, useTransform, motion} from 'framer-motion';
import * as styles from './styles.module.css';

function AnimateLine({animationStart}){
    const {scrollYProgress} = useScroll();
    const scale = useTransform(scrollYProgress, [animationStart, animationStart + 0.01], [0, 1]);

    return(
        <motion.div className={styles.line} style={{scaleX: scale}}>
            <div className={styles.glowEffect}/>
        </motion.div>
    )
}

export default AnimateLine;