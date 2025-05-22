import React, {useRef, useEffect} from 'react';
import calculateScrollThresholds from '~/assets/functions/calculateScrollThresholds.js';
import CreateMapping from '~/assets/functions/CreateMapping.js';
import {motion, useScroll, useMotionValueEvent, useMotionValue} from 'framer-motion';
import * as styles from './styles.module.css';



function Feature() {
    const square = useRef();
    const topScrollThreshold = useRef(0);
    const bottomScrollThreshold = useRef(1);
    const container = useRef();
    const {scrollYProgress} = useScroll();
    const width = useMotionValue(0);       

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        const top = topScrollThreshold.current;
        const bottom = bottomScrollThreshold.current;
        const lowerConstraint = 0;
        const upperConstraint = 400;

        if(value < top || value > bottom) return;

        const mappedValue = CreateMapping(top, bottom, lowerConstraint, upperConstraint, value);
        width.set(mappedValue);
    })

    useEffect(() => {
        const [top, bottom] = calculateScrollThresholds(container.current.offsetTop, container.current.offsetHeight)
        topScrollThreshold.current = top;
        bottomScrollThreshold.current = bottom;
    }, [])


    return (
        <motion.section 
            className={styles.container}
            ref={container}>
                <motion.h2 className={styles.title}>
                    Play Against The Almighty Stockfish Engine!
                </motion.h2>
        </motion.section>
    )
}

export default Feature;