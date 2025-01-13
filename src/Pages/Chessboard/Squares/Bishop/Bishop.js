import React from 'react';
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

function Bishop({color}) {
    return (
        <img className={styles.piece} src={icons[`${color}Bishop`]}/>
    )
}

export default Bishop;