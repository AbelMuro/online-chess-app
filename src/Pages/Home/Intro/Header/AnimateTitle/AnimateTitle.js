import React, {useRef} from 'react';
import AnimateLetter from './AnimateLetter';
import {motion} from 'framer-motion'
import {container_variant} from './Variants';
import * as styles from './styles.module.css';

function AnimateTitle({opacity, scale}) {
    const title = useRef('World Class Chess');
    const words = title.current.split(' ');

    return (
            <motion.div 
                className={styles.title} 
                initial={'text_hidden'} 
                animate={'write_text'} 
                variants={container_variant}
                style={{opacity, scale}}
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