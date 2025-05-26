import React, {useRef} from 'react';
import AnimateLetter from './AnimateLetter';
import {motion, easeInOut, useScroll, useTransform, useMotionValueEvent} from 'framer-motion'
import {container_variant} from './Variants';
import * as styles from './styles.module.css';

function AnimateTitle() {
    const {scrollYProgress} = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
    const title = useRef('World Class Chess');
    const words = title.current.split(' ');


    return (
            <motion.div 
                className={styles.title} 
                initial={'text_hidden'} 
                animate={'write_text'} 
                variants={container_variant}
                style={{opacity}}
                >
                    {words.map((word, wordIndex) => {
                        return (
                            <div className={styles.word_container}>
                                {word.split('').map((letter, letterIndex) => {
                                    return(
                                        <AnimateLetter 
                                            letter={letter} 
                                            letterIndex={letterIndex} 
                                            wordIndex={wordIndex}
                                        />
                                    )
                                })}
                            </div>
                        )})}
            </motion.div>            
    )
}

export default AnimateTitle;