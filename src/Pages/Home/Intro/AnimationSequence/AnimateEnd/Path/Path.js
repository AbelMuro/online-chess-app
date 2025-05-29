import React, {useEffect, useRef} from 'react';
import CreateMapping from '~/assets/functions/CreateMapping.js';
import {motion, useScroll, useMotionValueEvent, useMotionValue, easeInOut} from 'framer-motion';
import * as styles from './styles.module.css';

function Path({d, transform}) {
    const {scrollYProgress} = useScroll();
    const pathInnerRef = useRef();
    const pathOuterRef = useRef();
    const strokeDashArray = useRef();
    const offset = useMotionValue();

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        if(value < 0.20) {
            pathInnerRef.current.style.display = 'none'
            pathOuterRef.current.style.display = 'none'
            return;
        }

        else if(value > 0.40) return;

        pathInnerRef.current.style.display = 'block'
        pathOuterRef.current.style.display = 'block'
        const mappedValue = CreateMapping(0.20, 0.40, strokeDashArray.current, 0, value);
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