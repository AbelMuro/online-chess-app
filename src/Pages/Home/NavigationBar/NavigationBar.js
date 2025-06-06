import React, {useRef, useEffect} from 'react';
import MobileNavBar from './MobileNavBar';
import useMediaQuery from '~/Hooks/useMediaQuery';
import {useNavigate} from 'react-router-dom';
import * as styles from './styles.module.css';

function NavigationBar() {
    const navigate = useNavigate();
    const [mobile] = useMediaQuery('(max-width: 700px)');
    const timeout = useRef();

    const handleNavigate = (route) => {
        navigate(route);
    }


    const handleLink = async (e) => {
        /* i need to find a way to scroll towards the element programmatically from here, in case the user is currently at #intro and goes to #credits*/
        

    }


    return mobile ? <MobileNavBar/> : 
        <nav className={styles.navigation}>
            <section className={styles.navigation_content}>
                <a className={styles.navigation_link} href={'#intro'} onClick={handleLink}>
                    Intro
                </a>
                <a className={styles.navigation_link} href={'#about-us'} onClick={handleLink}>
                    About Us
                </a>
                <a className={styles.navigation_link} href={'#faq'} onClick={handleLink}>
                    FAQ
                </a>
                <a className={styles.navigation_link} href={'#footer'} onClick={handleLink}>
                    Credits
                </a>
                <a className={styles.navigation_link}>
                    Play Now
                </a>
            </section>
        </nav>
    
}

export default NavigationBar;