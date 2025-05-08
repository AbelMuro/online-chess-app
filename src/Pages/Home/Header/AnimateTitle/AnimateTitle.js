import React from 'react';
import {motion} from 'framer-motion';
import * as styles from './styles.module.css';

function AnimateTitle() {
    return(
        <svg width="300" height="100" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
            <motion.text
            x="10"
            y="50"
            fontFamily="AmandaBlackPersonal, sans-serif"
            fontSize="40"
            fill="black"
            initial={{ strokeDasharray: 300, strokeDashoffset: 300 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            >
                World Class Chess
            </motion.text>
      </svg>       
    )

}

export default AnimateTitle;