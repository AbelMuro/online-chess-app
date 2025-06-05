import React from 'react';
import {useScroll, useTransform, motion} from 'framer-motion';
import * as styles from './styles.module.css';

function AnimateLines() {
    const {scrollYProgress} = useScroll();
    const scale = useTransform(scrollYProgress, [0.47, 0.49], [0, 1]);


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