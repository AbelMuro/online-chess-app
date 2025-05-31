import React from 'react';
import icons from './icons';
import * as styles from './styles.module.css';

function KnightIcon() {
    return(
        <div className={styles.container}>
            <img className={styles.knight} src={icons['knight']}/>
            <div className={styles.glowEffect}></div>
        </div>
    )
}

export default KnightIcon;