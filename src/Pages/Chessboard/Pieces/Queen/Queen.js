import React from 'react';
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

function Queen({color}) {
    return (
        <img className={styles.piece} src={icons[`${color}Queen`]}/>
    )
}

export default Queen;