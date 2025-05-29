import React, {useRef, useEffect} from 'react';
import getPathCommandsAsArray from '~/assets/functions/GetPathCommandsAsArray.js';
import CreateMapping from '~/assets/functions/CreateMapping.js'
import { useMotionValue, useScroll, motion, useMotionValueEvent} from 'framer-motion';
import * as styles from './styles.module.css';

function Paths({d, transform}) {
    const {scrollYProgress} = useScroll();
    const pathOneRef = useRef();
    const pathTwoRef = useRef();
    const strokeDashArray = useRef();
    const offset = useMotionValue();


    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        if(value > 0.20) {
            pathOneRef.current.style.opacity = '0'
            pathTwoRef.current.style.opacity = '0'
            return;
        }
        pathOneRef.current.style.opacity = '1'
        pathTwoRef.current.style.opacity = '1'
        const mappedValue = CreateMapping(0, 0.20, 0, strokeDashArray.current, value);
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