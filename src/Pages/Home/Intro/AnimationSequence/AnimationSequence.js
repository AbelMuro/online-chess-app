import React from 'react';
import AnimateTitle from './AnimateTitle';
import AnimateStartButton from './AnimateStartButton';
import AnimateWorld from './AnimateWorld';
import { easeOut, easeInOut , easeIn} from "framer-motion";
import {useScroll, useMotionValueEvent, useTransform} from 'framer-motion';
import * as styles from './styles.module.css';

/* i need to finish the zoom-in animation for the world svg element 
   then i will need to design the next scrolling animation feature

   also, update notes for framer-motion on the ease functions and for
   SVG elements on the viewBox attribute
*/

function AnimationSequence() {
    const {scrollYProgress} = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.22], [1, 3], { ease: easeInOut});
    const viewBox = useTransform(scrollYProgress, [0, 0.32], ['0 0 1024 1024', '300 300 400 400']);

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        console.log(value);
    })
    
    return(        
        <header className={styles.header}>
            <AnimateTitle opacity={opacity} scale={scale}/>
            <AnimateStartButton opacity={opacity}/>
            <AnimateWorld viewBox={viewBox}/>
        </header>
    )
}

export default AnimationSequence;