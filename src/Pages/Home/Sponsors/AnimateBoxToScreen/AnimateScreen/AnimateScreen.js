import React from 'react';
import AnimateText from './AnimateText';
import {motion, useScroll, useTransform} from 'framer-motion'
import * as styles from './styles.module.css';


function AnimateScreen() {
    const {scrollYProgress} = useScroll();
    const color = useTransform(scrollYProgress, [0.57, 0.60, 0.63, 0.66, 0.69, 0.72, 0.75, 0.78, 0.81], ['#0000ff', '#800080', '#ff0000', '#ffa500', '#ffff00', '#008000', '#ffc0cb', '#808080', '#add8e6']);

    return (
            <motion.div 
                className={styles.screen} 
                initial={{width: '0%', height: '0vh'}} 
                exit={{width: 0, height: 0, transition: {duration: 0.4}}}
                animate={{width: '100%', height: '100vh', transition: {type: 'spring', stiffness: 80, damping: 12, delay: 0.4}}}
                style={{backgroundColor: color}}
                >
                    <AnimateText/>
            </motion.div>
    )     
    
}

export default AnimateScreen;