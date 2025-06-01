import React from 'react';
import CreateMapping from '~/assets/functions/CreateMapping.js';
import {useScroll, useMotionValueEvent, useMotionValue, motion} from 'framer-motion';
import * as styles from './styles.module.css';

function AnimateLine({upperThreshold, lowerThreshold}){
    const {scrollYProgress} = useScroll();
    const scale = useMotionValue(0);

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        if(value < upperThreshold || value > lowerThreshold) return;

        const mappedValue = CreateMapping(upperThreshold, lowerThreshold, 0, 1, value);
        scale.set(mappedValue);
    })

    return(
        <motion.div className={styles.line} style={{scaleX: scale}}>
            <div className={styles.glowEffect}/>
        </motion.div>
    )
}

export default AnimateLine;