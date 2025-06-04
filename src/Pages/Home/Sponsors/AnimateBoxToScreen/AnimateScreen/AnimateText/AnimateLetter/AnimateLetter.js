import React, {useRef, useMemo, useState} from "react";
import {motion, useMotionValue} from 'framer-motion'
import * as styles from './styles.module.css';

/* 
    this is where i left off, i need to animate the text that is being displayed
    based on the scroll position

*/

function AnimateLetter({letter, word}) {
    const containerRef = useRef();
    const x = useMotionValue(0);     
    const repeat = useMemo(() => Array.from({length: 15}, (_, i) => i), []);
    const repeatedLetters = useMemo(() => repeat.map((_, i) => {
            return(
                <p key={i}>
                    <span>
                       {letter} 
                    </span>
                </p>
            )
    }), [])

    x.on('change', (value) => {
        if(!containerRef.current) return;
        containerRef.current.scrollTo({top: value, behavior: 'smooth'});
    })




    return(       
        <div className={styles.container}>
            <div className={styles.letter} ref={containerRef}>
                {repeatedLetters}
            </div>
            <motion.div 
                className={styles.ignore} 
                variants={{
                    initial: {x: 0}, 
                    end: {x: 3500}
                }} 
                style={{x}}/>        
        </div>             
    )
}

export default AnimateLetter;