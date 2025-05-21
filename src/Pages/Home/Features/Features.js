import React, {useRef, useEffect} from 'react';
import calculateScrollThresholds from '~/assets/functions/calculateScrollThresholds.js';
import {motion, useScroll, useTransform, useMotionValueEvent, useMotionValue} from 'framer-motion';
import * as styles from './styles.module.css';



function Feature() {
    const square = useRef();
    const topScrollThreshold = useRef(0);
    const bottomScrollThreshold = useRef(1);
    const container = useRef();
    const {scrollYProgress} = useScroll();
    const width = useMotionValue(0);       
    //const constraint = useTransform(scrollYProgress, [topScrollThreshold.current, bottomScrollThreshold.current], [0, 400]);



    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        const top = topScrollThreshold.current;
        const bottom = bottomScrollThreshold.current;

        if(value < top || value > bottom) return;

        //look up linear interpolation to create a mapping between the range top to bottom and the range 0 to 400
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
                <motion.div 
                    className={styles.square}
                    style={{width}}
                    ref={square}
                    >

                </motion.div>
        </motion.section>
    )
}

export default Feature;