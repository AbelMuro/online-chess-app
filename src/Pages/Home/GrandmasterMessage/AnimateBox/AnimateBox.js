import React, {useContext, useEffect, useState} from 'react';
import { BlueScreenContext } from '-/Home.js';
import {useScroll, useTransform, motion, useAnimationControls} from 'framer-motion';
import icons from './icons';
import * as styles from './styles.module.css';


function AnimateBox() {
    const [mount, setMount] = useState(false);
    const {blueBoxTransition} = useContext(BlueScreenContext);    
    const controlsX = useAnimationControls();
    const controlsRotate = useAnimationControls();
    const controlsBlur = useAnimationControls();
    const {scrollYProgress} = useScroll();
    const x = useTransform(scrollYProgress, [0.53, 0.54], [0, -270]);
    const rotate = useTransform(scrollYProgress, [0.53, 0.54], [0, 360]);
    const blur = useTransform(scrollYProgress, [0.57, 0.61], [50, 0]);

    x.on('change', (value) => {
        controlsX.start({x: value, transition: {duration: 0.2}})
    })

    rotate.on('change', (value) => {
        controlsRotate.start({rotate: value, transition: {duration: 0.5}});
    })

    blur.on('change', (value) => {
        controlsBlur.start({filter: `blur(${value}px)`, transition: {duration: 0}})
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