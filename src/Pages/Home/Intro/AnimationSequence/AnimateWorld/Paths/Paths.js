import React, {useRef, useEffect, useContext} from 'react';
import { ThresholdContext } from '../../../Intro';
import CreateMapping from '~/Common/Functions/CreateMapping.js'
import { useMotionValue, useScroll, motion, useMotionValueEvent} from 'framer-motion';
import * as styles from './styles.module.css';

function Paths({d, transform}) {
    const {topThreshold} = useContext(ThresholdContext);
    const {scrollYProgress} = useScroll();
    const pathOneRef = useRef();
    const pathTwoRef = useRef();
    const strokeDashArray = useRef();
    const offset = useMotionValue();


    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        if(value > topThreshold + 0.23) {
            pathOneRef.current.style.opacity = '0'
            pathTwoRef.current.style.opacity = '0'
            return;
        }
        pathOneRef.current.style.opacity = '1'
        pathTwoRef.current.style.opacity = '1'
        let mappedValue = CreateMapping(topThreshold, topThreshold + 0.23, 0, strokeDashArray.current, value);
        if(mappedValue < 0) mappedValue = 0;
        offset.set(mappedValue);
    })

    useEffect(() => {
        const totalPathOneLength = pathOneRef.current.getTotalLength();
        const totalPathTwoLength = pathTwoRef.current.getTotalLength();
        pathOneRef.current.setAttribute('stroke-dasharray', totalPathOneLength);
        pathTwoRef.current.setAttribute('stroke-dasharray', totalPathTwoLength)
        strokeDashArray.current = totalPathOneLength;
    }, [])

    return(
        <>
            <motion.path 
                className={styles.path} 
                transform={transform} 
                d={d} 
                fill='none' 
                stroke={'blue'} 
                strokeWidth={'2'} 
                strokeDashoffset={offset}
                ref={pathOneRef} />
            <motion.path 
                className={styles.path} 
                transform={transform} 
                d={d} 
                fill='none' 
                stroke={'blue'} 
                strokeWidth={'14'} 
                strokeDashoffset={offset}
                filter='url(#glowEffect)'
                ref={pathTwoRef} />        
        </>

    )
}

export default Paths;