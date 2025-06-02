import React, {useRef, useState} from 'react';
import CreateMapping from '~/assets/functions/CreateMapping.js';
import {useScroll, motion, useTransform, useMotionValueEvent, AnimatePresence, useMotionValue} from 'framer-motion';
import * as styles from './styles.module.css';

function AnimateDescription() {
    const {scrollYProgress} = useScroll();
    const container = useRef();
    const text = useRef(`Whether you're facing off against real opponents from around the world or testing your skills against the powerful Stockfish engine, this app brings the thrill of strategy to your fingertips. Ready to sharpen your tactics and outwit the competition? Play now and take your chess game to the next level!`)
    const [visibleChars, setVisibleChars] = useState(''); 
    const opacity = useTransform(scrollYProgress, [0.35, 0.40], [1, 0]);

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        if(value <= 0.125){
            container.current.style.display = 'none';
            return;
        }
        container.current.style.display = 'flex';
        const mappedValue = CreateMapping(0.125, 0.25, 0, text.current.length, value);
        setVisibleChars(text.current.slice(0, mappedValue))            
    })


    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        if(value <= 0.35) 
            return;
        else if(value > 0.40){
            container.current.style.display = 'none';
            return;
        }
    })  

    return(
        <motion.section className={styles.description} ref={container} style={{opacity}}>
            <motion.h2 className={styles.description_title}>
                Introduction
            </motion.h2>
            <p className={styles.description_desc}>
                <AnimatePresence>
                    {visibleChars.split('').map((char, index) => {
                        return (
                            <motion.span 
                                key={index} 
                                initial={{opacity: 0, y: 10}} 
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: 10}}
                                >
                                    {char}
                            </motion.span>
                        )  
                    })}                    
                </AnimatePresence>
            </p>
        </motion.section>

    )
}

export default AnimateDescription;