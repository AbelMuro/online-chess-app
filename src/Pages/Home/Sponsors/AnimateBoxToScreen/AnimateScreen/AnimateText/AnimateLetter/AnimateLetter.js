import React, {useEffect, useRef, useState, useMemo} from "react";
import {motion, useMotionValue} from 'framer-motion'
import * as styles from './styles.module.css';

function AnimateLetter({letter, word}) {
    const containerRef = useRef();
    const repeat = useMemo(() => Array.from({length: 5}, (_, i) => i), []);
    const repeatedLetters = repeat.map((_, i) => {
            return(
                <span key={i}>
                    {letter}
                </span>
            )
        })
    const [scrollHeight, setScrollHeight] = useState(0);
    const x = useMotionValue(0);

    x.on('change', (value) => {
        if(!containerRef.current) return;

        containerRef.current.scrollTo({top: value, behavior: 'smooth'});
    })

    useEffect(() => {
        if(!containerRef.current) return;

        const scrollContainer = containerRef.current;
        setScrollHeight(scrollContainer.scrollHeight);
    }, [])


    return(       
        <div className={styles.container}>
            <div className={styles.letter} ref={containerRef}>
                {repeatedLetters}
            </div>
            {word.map((letter) => {
                return (
                    <span>
                        {letter}
                    </span>
                )
            })}

            <motion.div 
                className={styles.ignore} 
                variants={{
                    initial: {x: 0}, 
                    end: {x: scrollHeight}
                }} 
                style={{x}}/>        
        </div>             
    )
}

export default AnimateLetter;