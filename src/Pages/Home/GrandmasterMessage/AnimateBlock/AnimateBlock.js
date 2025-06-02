import React, {useContext, useEffect, useState} from 'react';
import { BlueScreenContext } from '-/Home.js';
import {useScroll, useTransform, motion} from 'framer-motion';
import icons from './icons';
import * as styles from './styles.module.css';

function AnimateBlock({fromX, toX, blurUpperThreshold, blurLowerThreshold}) {
    const [mount, setMount] = useState(false);
    const {blueBoxTransition} = useContext(BlueScreenContext);
    const {scrollYProgress} = useScroll();
    const x = useTransform(scrollYProgress, [0.49, 0.50], [fromX, toX]);
    const rotate = useTransform(scrollYProgress, [0.49, 0.50], [0, 360]);
    const blur = useTransform(scrollYProgress, [blurUpperThreshold, blurLowerThreshold], [50, 0]);
    const blurFilter = useTransform(blur, (value) => `blur(${value}px)`);



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
            <motion.div className={styles.block} style={{x}} layoutId='blue_block'>
                <motion.img style={{rotate}} className={styles.block_rook} src={icons['rook']}/>
                <motion.div className={styles.glow_effect} style={{filter: blurFilter}}/>
            </motion.div>                
    )
}

export default AnimateBlock;