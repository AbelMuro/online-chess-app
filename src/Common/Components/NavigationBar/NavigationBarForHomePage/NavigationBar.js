import React, {useRef, useEffect} from 'react';
import MobileNavBar from './MobileNavBar';
import useMediaQuery from '~/Hooks/useMediaQuery';
import {useNavigate} from 'react-router-dom';
import * as styles from './styles.module.css';

function NavigationBar() {
    const navigate = useNavigate();
    const [mobile] = useMediaQuery('(max-width: 700px)');

    const handleNavigate = () => {
        navigate('/login');
    }


    const handleLink = async (id) => {                   // i am programmatically clicking on the <a/> link again to make sure that the browser scrolls to the specified element
        const element = document.getElementById(id);  
        element.scrollIntoView({behavior: 'smooth'}); 
        setTimeout(() => {                               // in the FAQ component, i have a function that disables scrolling to make sure the scroll animation finishes before the user continues scrolling                       
            console.log('scrolling towards element')     // this function will stop the browser from scrolling when the <a/> links have been clicked initially
            element.scrollIntoView({behavior: 'smooth'});       
        }, 1200)
    }

    useEffect(() => {
        const body = document.querySelector('body');
        body.style.backgroundColor = 'black';
    }, [])


    return mobile ? <MobileNavBar handleLink={handleLink}/> : 
        <nav className={styles.navigation}>
            <section className={styles.navigation_content}>
                <a className={styles.navigation_link} onClick={() => handleLink('intro')}>
                    Intro
                </a>
                <a className={styles.navigation_link} onClick={() => handleLink('about-us')}>
                    About Us
                </a>
                <a className={styles.navigation_link} onClick={() => handleLink('faq')}>
                    FAQ
                </a>
                <a className={styles.navigation_link} onClick={() => handleLink('footer')}>
                    Credits
                </a>
                <a className={styles.navigation_link} onClick={handleNavigate}>
                    Login
                </a>
            </section>
        </nav>
    
}

export default NavigationBar;