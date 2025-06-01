import React, {useEffect} from 'react';
import DisplayBorder from './DisplayBorder';
import NavigationBar from './NavigationBar';

import BackgroundMouseAnimation from './BackgroundMouseAnimation';
import {useScroll, useMotionValueEvent} from 'framer-motion';
import Intro from './Intro';
import AboutUs from './AboutUs';
import GrandmasterMessage from './GrandmasterMessage'
import Sponsors from './Sponsors';
import * as styles from './styles.module.css';

function Home() {
    const {scrollYProgress} = useScroll();

    function smoothScroll(targetY) {
        const startY = window.scrollY;
        const distance = targetY - startY;
        let startTime = null;

        function animationStep(time) {
            if (!startTime) startTime = time;
            const progress = (time - startTime) / 500; // Adjust duration here
            const ease = progress < 1 ? 1 - Math.pow(1 - progress, 3) : 1; // Cubic easing

            window.scrollTo(0, startY + distance * ease);

            if (progress < 1) requestAnimationFrame(animationStep);
        }

        requestAnimationFrame(animationStep);
    }

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        console.log(value);
    })

    useEffect(() => {
        return;
        const handleScroll = (e) => {
           e.preventDefault();
           smoothScroll(100)
        }

        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])
    

    return(
        <section className={styles.home}>
            {/*<BackgroundMouseAnimation/> */}
            <DisplayBorder/>
            <NavigationBar/>
            <Intro/>
            <AboutUs/>
            <GrandmasterMessage/>
            <Sponsors/>
        </section>
    )
}

export default Home;