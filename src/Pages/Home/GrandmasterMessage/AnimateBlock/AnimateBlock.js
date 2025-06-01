import React, {useState} from 'react';
import CreateMapping from '~/assets/functions/CreateMapping.js';
import {useScroll, useMotionValueEvent, useMotionValue, useTransform, motion} from 'framer-motion';
import icons from './icons';
import * as styles from './styles.module.css';

function AnimateBlock({fromX, toX, blurUpperThreshold, blurLowerThreshold}) {
    const [mount, setMount] = useState(false)
    const {scrollYProgress} = useScroll();
    const x = useMotionValue(0);
    const rotate = useMotionValue(0);
    const blur = useMotionValue(50);
    const blurFilter = useTransform(blur, (value) => `blur(${value}px)`);

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        if(value < 0.49 || value > 0.50) return;

        const mappedValueX = CreateMapping(0.49, 0.50, fromX, toX, value);
        const mappedValueRotate = CreateMapping(0.49, 0.50, 0, 360, value);
        x.set(mappedValueX);
        rotate.set(mappedValueRotate)
    })  

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        if(value < blurUpperThreshold || value > blurLowerThreshold) return;

        const mappedValue = CreateMapping(blurUpperThreshold, blurLowerThreshold, 50, 0, value);
        blur.set(mappedValue);
    })  

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        if(value < blurLowerThreshold + 0.01) 
            setMount(true);
        else
            setMount(false);
    })

    return mount && (
        <motion.div className={styles.block} style={{x}} layoutId='blue_block'>
            <motion.img className={styles.block_rook} src={icons['rook']} style={{rotate}}/>
            <motion.div className={styles.glow_effect} style={{filter: blurFilter}}/>
        </motion.div>
    )

}

export default AnimateBlock;