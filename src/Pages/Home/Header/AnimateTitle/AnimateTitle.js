import React, {useRef} from 'react';
import AnimateLetter from './AnimateLetter';
import {motion} from 'framer-motion'
import {container_variant, text_variant} from './Variants';
import * as styles from './styles.module.css';

function AnimateTitle({controls}) {
    const title = useRef('World Class Chess');
    const words = title.current.split(' ');

    return (
            <motion.div className={styles.title} initial={'text_hidden'} animate={controls} variants={container_variant}>
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