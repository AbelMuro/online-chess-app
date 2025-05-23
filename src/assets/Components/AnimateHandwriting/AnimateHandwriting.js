import React from 'react';
import {motion} from 'framer-motion';
import AnimateLetter from './AnimateLetter';
import * as styles from './styles.module.css';
import { container_variant } from './Variants';

function AnimateHandwriting({text}) {
    const words = text.split(' ');

    return(            
        <motion.div className={styles.container} initial={'text_hidden'} animate={'write_text'} variants={container_variant}>
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

export default AnimateHandwriting;