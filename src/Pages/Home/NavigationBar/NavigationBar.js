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
                <a className={styles.navigation_logo}>
                    <img src={'/icons/World-class-chess-logo.png'}/>
                </a>
            </section>
        </nav>
    
}

export default NavigationBar;