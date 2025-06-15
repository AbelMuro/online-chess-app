import React, {useRef, useState, useContext} from 'react';
import { ThresholdContext } from '../../Intro';
import CreateMapping from '~/Common/Functions/CreateMapping.js';
import {useScroll, motion, useTransform, useMotionValueEvent, AnimatePresence} from 'framer-motion';
import * as styles from './styles.module.css';

function AnimateDescription() {
    const {topThreshold } = useContext(ThresholdContext);
    const {scrollYProgress} = useScroll();
    const container = useRef();
    const text = useRef(`Whether you're facing off against real opponents from around the world or testing your skills against the powerful Stockfish engine, this app brings the thrill of strategy to your fingertips. Ready to sharpen your tactics and outwit the competition? Play now and take your chess game to the next level!`)
    const [visibleChars, setVisibleChars] = useState(''); 
    const opacity = useTransform(scrollYProgress, [topThreshold + 0.33, topThreshold + 0.37], [1, 0]);

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        const from = topThreshold + 0.16;
        const to = topThreshold + 0.30;
        const remove = topThreshold + 0.38

        if(value <= from){
            container.current.style.display = 'none';
            return;
        }
        else if(value >= remove){
            container.current.style.display = 'none';
            return;
        }
        container.current.style.display = 'flex';
        const mappedValue = CreateMapping(from, to, 0, text.current.length, value);
        setVisibleChars(text.current.slice(0, mappedValue))            
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
                                animate={{opacity: 1, y: 0, transition: {duration: 0.8}}}
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