import React from 'react';
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

function King({color}) {
    console.log(color);
    return (
        <img className={styles.piece} src={icons[`${color}King`]}/>
    )
}

export default King;