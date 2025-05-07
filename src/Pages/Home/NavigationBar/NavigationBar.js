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
                <ul className={styles.navigation_links}>
                    <li onClick={() => handleNavigate('/')}>
                        <a>
                            Home
                        </a>
                    </li>
                    <li onClick={() => handleNavigate('/aboutus')}>
                        <a>
                            About Us
                        </a>
                    </li>
                    <li onClick={() => handleNavigate('/contactus')}>
                        <a>
                            Contact Us
                        </a>
                    </li>
                </ul>
                <ul className={styles.navigation_auth}>
                    <li>
                        <button className={styles.navigation_register} onClick={() => handleNavigate('/register')}>
                            Register
                        </button>
                    </li>
                    <li>
                        <button className={styles.navigation_login} onClick={() => handleNavigate('/login')}>
                            Login
                        </button> 
                    </li>
                </ul>
            </section>
        </nav>
    
}

export default NavigationBar;