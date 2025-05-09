import React from 'react';
import AnimateTitle from './AnimateTitle';
import * as styles from './styles.module.css';

function Header() {
    return(
        <header className={styles.header}>
            <AnimateTitle/>
        </header>
    )
}

export default Header;