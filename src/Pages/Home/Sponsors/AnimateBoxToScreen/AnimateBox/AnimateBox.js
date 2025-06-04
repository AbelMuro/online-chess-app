import React, {memo} from 'react';
import {motion} from 'framer-motion';
import * as styles from './styles.module.css';

function AnimateBox({mount}){

    return mount ? (
        <motion.div className={styles.block} layoutId='blue_block'/>
    ) : null;
}

export default memo(AnimateBox);