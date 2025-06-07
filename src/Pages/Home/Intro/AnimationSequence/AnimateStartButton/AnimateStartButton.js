import React, {useState, useRef, useContext} from 'react';
import { ThresholdContext } from '../../Intro';
import {useNavigate} from 'react-router-dom';
import {button_variant, linearGradientBlue_variant, linearGradientBlack_variant } from './Variants';
import {motion, useTransform, useScroll, useMotionValueEvent} from 'framer-motion';
import * as styles from './styles.module.css';

function AnimateStartButton() {
    const {topThreshold} = useContext(ThresholdContext);
    const navigate = useNavigate();
    const [stopColorOne, setStopColorOne] = useState('blue');
    const [stopColorTwo, setStopColorTwo] = useState('black');
    const {scrollYProgress} = useScroll();
    const opacity = useTransform(scrollYProgress, [topThreshold, topThreshold + 0.15], [1, 0]);
    const button = useRef();

    const onHoverStart = () => {
        setStopColorOne('black');
        setStopColorTwo('blue');
    }

    const onHoverEnd = () => {
        setStopColorOne('blue');
        setStopColorTwo('black');
    }

    const handleNavigate = () => {
        navigate('/login')
    }

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        if(value <= topThreshold + 0.15)
            button.current.style.display = 'block';
        else
            button.current.style.display = 'none';
    
    })

    return(
        <motion.button 
            onClick={handleNavigate}
            className={styles.start} 
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
            initial={'hidden'} 
            animate={'show'} 
            variants={button_variant}
            ref={button}
            style={{opacity}}
            > 
                <svg className={styles.background}>
                    <defs>
                        <linearGradient id="grad1">
                            <motion.stop stopColor={stopColorOne} initial='initial' animate={'animate'} variants={linearGradientBlue_variant}/>
                            <motion.stop stopColor={stopColorTwo} initial='initial' animate={'animate'} variants={linearGradientBlack_variant}/>
                        </linearGradient>
                    </defs>
                    <rect className={styles.background_rect} fill="url(#grad1)" />
                </svg>
                <span>Play Online!</span>
        </motion.button>
    )
}

export default AnimateStartButton;