import React, {useRef} from 'react';
import {motion, useScroll, useMotionValueEvent, useTransform} from 'framer-motion';
import * as styles from './styles.module.css';

function AnimateGlowingText() {
    const {scrollYProgress} = useScroll();
    const opacity = useTransform(scrollYProgress, [0.40, 0.42], [0, 1])
    const container = useRef();

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        if(value < 0.40) 
            container.current.style.display = 'none';
        else
            container.current.style.display = 'block'
    })  

    return(
        <motion.div className={styles.container} style={{opacity}} ref={container}>
            <motion.p className={styles.text}>
                {`[About Us]`}
            </motion.p>
            <motion.p className={styles.glow}>
                {`[About Us]`}
            </motion.p>    
        </motion.div>
    )
}

export default AnimateGlowingText;