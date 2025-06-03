import React from 'react';
import AnimateText from './AnimateText';
import {motion, useScroll, useTransform} from 'framer-motion'
import * as styles from './styles.module.css';

/* 
    use hexadecimal values for the colors here
*/

function AnimateScreen() {
    const {scrollYProgress} = useScroll();
    const color = useTransform(scrollYProgress, [0.57, 0.58, 0.59, 0.60, 0.61, 0.62, 0.63, 0.64, 0.65], ['blue', 'purple', 'red', 'orange', 'yellow', 'green', 'pink', 'grey', 'lightblue']);

    return (
            <motion.div 
                className={styles.screen} 
                initial={{width: 0, height: 0}} 
                exit={{width: 0, height: 0, transition: {duration: 0.4}}}
                animate={{width: '100%', height: '100vh', transition: {type: 'spring', stiffness: 80, damping: 12, delay: 0.4}}}
                style={{backgroundColor: color}}
                >
                    <AnimateText/>
            </motion.div>
    )     
    
}

export default AnimateScreen;