import React, {useEffect, useRef, useState} from "react";
import {motion, useAnimationControls, useMotionValue} from 'framer-motion'
import * as styles from './styles.module.css';

function AnimateLetter({repeatedLetters}) {
    const containerRef = useRef();
    const [scrollHeight, setScrollHeight] = useState(0);
    const x = useMotionValue(0);
    const controls = useAnimationControls();

    x.on('change', (value) => {
        containerRef.current.scrollTo({top: value, behavior: 'smooth'});
    })

    useEffect(() => {
        if(!containerRef.current) return;

        const scrollContainer = containerRef.current;
        setScrollHeight(scrollContainer.scrollHeight);
    }, [])

    useEffect(() => {
        setTimeout(() => {
            controls.start({x: 0})
            controls.start({x: scrollHeight});
        }, 500)
    }, [scrollHeight])


    return(       
        <>
            <div className={styles.letter} ref={containerRef}>
                {repeatedLetters}
            </div>
            <motion.div 
                className={styles.ignore} 
                variants={{
                    initial: {x: 0}, 
                    end: {x: scrollHeight}
                }} 
                style={{x}}/>        
        </>             
    )
}

export default AnimateLetter;