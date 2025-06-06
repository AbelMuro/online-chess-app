import React, {memo, useContext, useRef} from 'react';
import { ThresholdContext } from '../../FAQ';
import {motion, useScroll, useMotionValueEvent} from 'framer-motion';
import * as styles from './styles.module.css';

function AnimateBox({mount}){
    const {scrollYProgress} = useScroll();
    const {bottomThreshold} = useContext(ThresholdContext);
    const containerRef = useRef();

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        if(!containerRef.current) return;


        if(value < bottomThreshold) 
            containerRef.current.style.display = 'block';
        else
            containerRef.current.style.display = 'none'
    })

    return mount ? (
        <motion.div className={styles.block} layoutId='blue_block' ref={containerRef}/>
    ) : null;
}

export default memo(AnimateBox);