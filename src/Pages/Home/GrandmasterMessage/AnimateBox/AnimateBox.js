import React, {useContext, useEffect, useState} from 'react';
import { BlueScreenContext } from '-/Home.js';
import { ThresholdContext } from '../GrandmasterMessage';
import {useScroll, useTransform, motion, useAnimationControls} from 'framer-motion';
import icons from './icons';
import * as styles from './styles.module.css';


function AnimateBox() {
    const [mount, setMount] = useState(false);
    const {blueBoxTransition} = useContext(BlueScreenContext);   
    const {topThreshold} = useContext(ThresholdContext) 
    const controlsX = useAnimationControls();
    const controlsRotate = useAnimationControls();
    const controlsBlur = useAnimationControls();
    const {scrollYProgress} = useScroll();
    const x = useTransform(scrollYProgress, [topThreshold + 0.01, topThreshold + 0.02], [0, -270]);
    const rotate = useTransform(scrollYProgress, [topThreshold + 0.01, topThreshold + 0.02], [0, 360]);
    const blur = useTransform(scrollYProgress, [topThreshold + 0.05, topThreshold + 0.09], [50, 0]);

    x.on('change', (value) => {
        controlsX.start({x: value, transition: {duration: 0.2}})
    })

    rotate.on('change', (value) => {
        controlsRotate.start({rotate: value, transition: {duration: 0.5}});
    })

    blur.on('change', (value) => {
        controlsBlur.start({filter: `blur(${value}px)`, transition: {duration: 0}});
    })

    useEffect(() => {
        if(blueBoxTransition === 'second phase'){
            setMount(false);
        }
        else{
            setTimeout(() => {
                setMount(true);
            }, 400)
        }

    }, [blueBoxTransition])
    

    return mount && (
            <motion.div className={styles.block} initial={{x: x.get()}} animate={controlsX} layoutId='blue_block'>
                <motion.img initial={{rotate: rotate.get()}} animate={controlsRotate} className={styles.block_rook} src={icons['rook']}/>
                <motion.div initial={{filter: `blur(${blur.get()}px)`}} animate={controlsBlur} className={styles.glow_effect}/>
            </motion.div>                
    )
}

export default AnimateBox;