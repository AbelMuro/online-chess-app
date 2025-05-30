import React, {useRef, useState} from 'react';
import AnimateLetter from './AnimateLetter';
import {motion, cubicBezier, useScroll, useTransform, useMotionValueEvent} from 'framer-motion'
import {container_variant} from './Variants';
import * as styles from './styles.module.css';

function AnimateTitle() {
    const {scrollYProgress} = useScroll();
    const [mount, setMount] = useState(true);
    const opacity = useTransform(scrollYProgress, [0, 0.12], [1, 0], {ease: cubicBezier(0.25, 1, 1, 1)});
    const title = useRef('World Class Chess');
    const words = title.current.split(' ');
    const container = useRef();


    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        if(value <= 0.12)
            setMount(true);
        else
            setMount(false); 
    })

    return mount && (
            <motion.div 
                className={styles.title} 
                initial={'text_hidden'} 
                animate={'write_text'} 
                variants={container_variant}
                ref={container}
                style={{opacity}}>
                    {words.map((word, wordIndex) => {
                        return (
                            <div className={styles.word_container} key={`${word} ${wordIndex}`}>
                                {word.split('').map((letter, letterIndex) => {
                                    return(
                                        <AnimateLetter 
                                            key={`${letter} ${letterIndex}`}
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