import React from 'react';
import AnimateTitle from './AnimateTitle';
import * as styles from './styles.module.css';

function Header() {
    return(
        <header className={styles.header}>
            <h1 className={styles.header_title}>
                World Class Chess
            </h1>
        </header>
    )
}

export default Header;