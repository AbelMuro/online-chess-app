import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {button_variant, linearGradientBlue_variant, linearGradientBlack_variant } from './Variants';
import {motion} from 'framer-motion';
import * as styles from './styles.module.css';

function AnimateStartButton({opacity}) {
    const navigate = useNavigate();
    const [stopColorOne, setStopColorOne] = useState('blue');
    const [stopColorTwo, setStopColorTwo] = useState('black')

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

    return(
        <motion.button 
            onClick={handleNavigate}
            className={styles.start} 
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
            initial={'hidden'} 
            animate={'show'} 
            variants={button_variant}
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