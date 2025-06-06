import React, {useContext, useEffect, useState} from 'react';
import useMediaQuery from '~/Hooks/useMediaQuery';
import { BlueScreenContext } from '-/Home.js';
import { ThresholdContext } from '../GrandmasterMessage';
import {useScroll, useTransform, motion, useAnimationControls, useMotionValueEvent} from 'framer-motion';
import icons from './icons';
import * as styles from './styles.module.css';


function AnimateBox() {
    const [mobile] = useMediaQuery('(max-width: 500px)');
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

    useMotionValueEvent(x, 'change', (value) => {
        if(mobile) return;
        controlsX.start({x: value, transition: {duration: 0.2}})
    })

    useMotionValueEvent(rotate, 'change', (value) => {
        controlsRotate.start({rotate: value, transition: {duration: 0.5}});
    })

    useMotionValueEvent(blur, 'change', (value) => {
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

    useEffect(() => {
        if(mobile) 
            controlsX.start({x: 0, transition: {duration: 0.2}});
        else
            controlsX.start({x: x.get(), transition: {duration: 0.2}});
    }, [mobile])
    

    return mount && (
            <motion.div className={styles.block} initial={{x: mobile ? 0 : x.get()}} animate={controlsX} layoutId='blue_block'>
                <motion.img initial={{rotate: rotate.get()}} animate={controlsRotate} className={styles.block_rook} src={icons['rook']}/>
                <motion.div initial={{filter: `blur(${blur.get()}px)`}} animate={controlsBlur} className={styles.glow_effect}/>
            </motion.div>                
    )
}

export default AnimateBox;