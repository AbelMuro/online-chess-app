import React from 'react';
import {button_variant} from './Variants';
import {motion} from 'framer-motion';
import * as styles from './styles.module.css';

//i need to find a way to animate the linear-gradient here

function AnimateStartButton({controls}) {
    return(
        <motion.button 
            className={styles.start} 
            initial={'hidden'} 
            animate={controls} 
            variants={button_variant}> 
                Play Online!
        </motion.button>
    )
}

export default AnimateStartButton;