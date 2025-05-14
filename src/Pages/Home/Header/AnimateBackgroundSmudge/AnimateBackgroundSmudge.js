import React from 'react';
import { smudge_variant } from './Variants';
import {motion} from 'framer-motion';
import * as styles from './styles.module.css';

function AnimateBackgroundSmudge({controls}) {
    return(
            <motion.div 
                initial={{opacity: 0}}
                animate={controls}
                variants={smudge_variant}
                className={styles.background_smudge}/>
    )
}

export default AnimateBackgroundSmudge;