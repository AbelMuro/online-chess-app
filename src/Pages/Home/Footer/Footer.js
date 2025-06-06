import React from 'react';
import CircleDesign from './CircleDesign';
import * as styles from './styles.module.css';


function Footer() {
    return(
        <footer className={styles.container}>
            <h1 className={styles.title}>
                <span>
                    Developed by Abel Muro
                </span>
                <span>
                    Developed by Abel Muro
                </span>
            </h1>
            <CircleDesign/>
        </footer>
    )
}

export default Footer;