import React, {useRef, useEffect} from 'react';
import AnimateHandwriting from '~/assets/Components/AnimateHandwriting';
import calculateScrollThresholds from '~/assets/functions/calculateScrollThresholds.js';
import CreateMapping from '~/assets/functions/CreateMapping.js';
import {motion, useScroll, useMotionValueEvent, useMotionValue} from 'framer-motion';
import * as styles from './styles.module.css';



function Feature() {
    const ringSizes = [10, 20, 30, 40, 50, 60, 70, 80, 90]
    const topScrollThreshold = useRef(0);
    const bottomScrollThreshold = useRef(1);
    const container = useRef();
    const {scrollYProgress} = useScroll();
    const scaleTunnel = useMotionValue(0);     
    const scaleRing = useMotionValue(0);
    const opacityTunnel = useMotionValue(0);
    const translateZ = useMotionValue(0);  

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        const top = topScrollThreshold.current;
        const bottom = bottomScrollThreshold.current;

        if(value < top || value > bottom) return;

        const mappedScaleValue = CreateMapping(top, bottom, 0, 2, value);
        const mappedOpacityValue = CreateMapping(top, bottom, 0, 1, value);
        const mappedTranslateZValue = CreateMapping(top, bottom, 600, 0, value);
        scaleTunnel.set(mappedScaleValue);
        scaleRing.set(mappedScaleValue);
        opacityTunnel.set(mappedOpacityValue);
        translateZ.set(mappedTranslateZValue);
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
                    className={styles.tunnel} style={{scale: scaleTunnel, perspective: 1200, transform: `translateZ(${translateZ}px)`}}>
                    {ringSizes.map((size, i) => (
                        <motion.div
                            key={i}
                            className={styles.ring}
                            style={{scale: scaleRing, width: `${size}%` , height: `${size}%`}}
                        />
                    ))}
                </motion.div>
        </motion.section>
    )
}

export default Feature;