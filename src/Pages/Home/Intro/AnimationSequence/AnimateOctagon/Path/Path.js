import React, {useEffect, useRef, useContext} from 'react';
import { ThresholdContext } from '../../../Intro';
import CreateMapping from '~/Common/Functions/CreateMapping.js';
import {motion, useScroll, useMotionValueEvent, useMotionValue} from 'framer-motion';
import * as styles from './styles.module.css';

function Path({d, transform}) {
    const {topThreshold} = useContext(ThresholdContext);
    const {scrollYProgress} = useScroll();
    const pathInnerRef = useRef();
    const pathOuterRef = useRef();
    const strokeDashArray = useRef();
    const offset = useMotionValue();

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        const from = topThreshold + 0.25;
        const to = topThreshold + 0.40;

        if(value < from) {
            pathInnerRef.current.style.display = 'none'
            pathOuterRef.current.style.display = 'none'
            offset.set(strokeDashArray.current);
            return;
        }

        else if(value > to) {
            offset.set(0);
            return;
        };

        pathInnerRef.current.style.display = 'block'
        pathOuterRef.current.style.display = 'block'
        const mappedValue = CreateMapping(from, to, strokeDashArray.current, 0, value);
        offset.set(mappedValue);
    })

    useEffect(() => {
        const totalPathOneLength = pathInnerRef.current.getTotalLength();
        pathInnerRef.current.setAttribute('stroke-dasharray', totalPathOneLength);
        pathOuterRef.current.setAttribute('stroke-dasharray', totalPathOneLength);
        strokeDashArray.current = totalPathOneLength;
    }, [])

    return(
        <>
            <motion.path 
                className={styles.path} 
                d={d} 
                transform={transform} 
                ref={pathInnerRef} 
                fill='none' 
                stroke='blue' 
                strokeWidth='6' 
                strokeDashoffset={offset}/> 
            <motion.path 
                className={styles.path} 
                d={d} 
                transform={transform} 
                ref={pathOuterRef} 
                fill='none' 
                stroke='blue' 
                strokeWidth='43' 
                strokeDashoffset={offset} 
                filter={`url(#glowEffect)`}/>   
        </>
        
    )
}

export default Path;