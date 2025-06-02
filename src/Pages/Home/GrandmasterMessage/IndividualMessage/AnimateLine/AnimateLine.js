import React from 'react';
import {useScroll, useTransform, motion} from 'framer-motion';
import * as styles from './styles.module.css';

function AnimateLine({upperThreshold, lowerThreshold}){
    const {scrollYProgress} = useScroll();
    const scale = useTransform(scrollYProgress, [upperThreshold, lowerThreshold], [0, 1]);

    return(
        <motion.div className={styles.line} style={{scaleX: scale}}>
            <div className={styles.glowEffect}/>
        </motion.div>
    )
}

export default AnimateLine;