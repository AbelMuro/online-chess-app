import React from 'react';
import {motion} from 'framer-motion';

function AnimateHandwriting({animate}) {
    return(            
        <motion.div className={styles.title} initial={'text_hidden'} animate={animate} variants={container_variant}>
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