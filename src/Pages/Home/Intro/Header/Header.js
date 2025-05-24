import React from 'react';
import AnimateTitle from './AnimateTitle';
import AnimateStartButton from './AnimateStartButton';
import calculateScrollThresholds from '~/assets/functions/calculateScrollThresholds.js';
import CreateMapping from '~/assets/functions/CreateMapping.js';
import {useScroll, useMotionValueEvent, useTransform, useMotionValue} from 'framer-motion';
import * as styles from './styles.module.css';

function Header() {
    const {scrollYProgress} = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.12], [1, 3]);

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        console.log(value);
    })
    
    return(        
        <header className={styles.header}>
            <AnimateTitle opacity={opacity} scale={scale}/>
            <AnimateStartButton opacity={opacity}/>
        </header>
    )
}

export default Header;