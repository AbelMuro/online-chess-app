import React from 'react';
import {motion} from 'framer-motion';
import * as styles from './styles.module.css';

function AnimateTitle() {
    return(
        <svg viewBox="0 0 500 200" width="500" height="200">
            <motion.path
                d="M10,100 Q100,10 200,100 T400,100"
                fill="transparent"
                stroke="black"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ strokeDasharray: 500, strokeDashoffset: 500 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            />
        </svg>        
    )

}

export default AnimateTitle;