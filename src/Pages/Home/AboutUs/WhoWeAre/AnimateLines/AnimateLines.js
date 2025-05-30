import React, {} from 'react';
import CreateMapping from '~/assets/functions/CreateMapping.js'
import {useScroll, useMotionValue, useMotionValueEvent, motion} from 'framer-motion';
import * as styles from './styles.module.css';

function AnimateLines() {
    const {scrollYProgress} = useScroll();
    const scale = useMotionValue(0);

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        if(value < 0.43 || value > 0.45) return;

        const mappedValue = CreateMapping(0.43, 0.45, 0, 1, value);
        scale.set(mappedValue);
    })

    return(
        <section className={styles.container}>
            <motion.div className={styles.lineMobile} style={{scaleX: scale}}>
                <motion.div className={styles.glowEffect}/>
            </motion.div>               
            <motion.div className={styles.lineDesktop} style={{scaleY: scale}}>
                <motion.div className={styles.glowEffect}/>
            </motion.div>
        </section>
    )
}

export default AnimateLines;