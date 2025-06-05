import React, {useContext} from 'react';
import { ThresholdContext } from '../../AboutUs';
import {useScroll, useTransform, motion} from 'framer-motion';
import * as styles from './styles.module.css';

function AnimateLines() {
    const {topThreshold} = useContext(ThresholdContext);
    const {scrollYProgress} = useScroll();
    const scale = useTransform(scrollYProgress, [topThreshold, topThreshold + 0.02], [0, 1]);

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