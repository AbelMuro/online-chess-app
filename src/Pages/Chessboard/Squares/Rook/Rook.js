import React from 'react';
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

function Rook({color}) {
    return (
        <img className={styles.piece} src={icons[`${color}Rook`]}/>
    )
}

export default Rook;