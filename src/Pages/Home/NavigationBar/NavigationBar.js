import React from 'react';
import MobileNavBar from './MobileNavBar';
import useMediaQuery from '~/Hooks/useMediaQuery';
import {useNavigate} from 'react-router-dom';
import * as styles from './styles.module.css';

function NavigationBar() {
    const navigate = useNavigate();
    const [mobile] = useMediaQuery('(max-width: 700px)');

    const handleNavigate = (route) => {
        navigate(route);
    }

    return mobile ? <MobileNavBar/> : 
        <nav className={styles.navigation}>
            <section className={styles.navigation_content}>
                <a className={styles.navigation_link}>
                    Intro
                </a>
                <a className={styles.navigation_link}>
                    Features
                </a>
                <a className={styles.navigation_link}>
                    About Us
                </a>
                
            </section>
        </nav>
    
}

export default NavigationBar;