import React from 'react';
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

function Knight({color}) {
    return (
        <img className={styles.piece} src={icons[`${color}Knight`]}/>
    )
}

export default Knight;