import React, {useRef} from 'react';
import {motion} from 'framer-motion'
import * as styles from './styles.module.css';

function AnimateTitle() {
    const title = useRef('World Class Chess');
    const words = title.current.split(' ');

    return (
        <motion.div className={styles.container} transition={{staggerChildren: 1.2}}>
                {words.map((word) => {
                    return word.split('').map((letter, i) => {
                        return(
                            <svg width='50' height='50' viewBox='0 0 50 50'>
                                <motion.text
                                    x='0'
                                    y="30"
                                    fill="none"
                                    fontFamily="'amanda black', sans serif"
                                    fontSize="30"
                                    stroke="white"
                                    strokeWidth="1"
                                    strokeDasharray="300"
                                    strokeDashoffset="300"
                                    initial={{ strokeDashoffset: 300, strokeDasharray: 300}}
                                    animate={{strokeDashoffset: 0}}
                                    transition={{duration: 1}}
                                >
                                    {letter}
                                </motion.text>

                            </svg>

                        )
                    })})}
        </motion.div>
    )
}

export default AnimateTitle;