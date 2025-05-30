import React, {useRef} from 'react';
import CreateMapping from '~/assets/functions/CreateMapping.js';
import {motion, useScroll, useMotionValueEvent, useMotionValue} from 'framer-motion';
import * as styles from './styles.module.css';

function AnimateGlowingText() {
    const {scrollYProgress} = useScroll();
    const opacity = useMotionValue();
    const container = useRef();

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        if(value < 0.40) {
            container.current.style.display = 'none';
            return;
        };

        container.current.style.display = 'block'
        const mappedValue = CreateMapping(0.40, 0.42, 0, 1, value);
        opacity.set(mappedValue);
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