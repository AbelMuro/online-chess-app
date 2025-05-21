import React, {useRef, useEffect} from 'react';
import {motion, useScroll, useTransform, useMotionValueEvent} from 'framer-motion';
import * as styles from './styles.module.css';

//this is where i left off, im trying to stop the behavior of position sticky at some point
// and resume the sticky behavior when the user scrolls back up

function Feature() {
    const containerRef = useRef();
    const {scrollYProgress} = useScroll();
    const width = useTransform(scrollYProgress, [0, 1], [0, 400]);

    useMotionValueEvent(width, 'change', (latest) => {
        if(latest !== 400) return;
        containerRef.current.style.position = 'relative';
    })


    return (
        <motion.section className={styles.container} style={{width}} ref={containerRef}>
            
        </motion.section>
    )
}

export default Feature;