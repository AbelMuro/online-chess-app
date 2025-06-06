import React from 'react';
import {motion} from 'framer-motion';
import * as styles from './styles.module.css';

function Circle({duration, from, to, ...props}) {


    return(
        <motion.g initial={{rotate: from}} animate={{rotate: to, transition: {repeat: Infinity, duration, ease: 'linear'}}}>
            <circle {...props}/>
            <circle {...props} filter='url(#blurCircle)' />
        </motion.g>
        
    )
}

export default Circle;