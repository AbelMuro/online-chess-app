import React, {createContext, useState, useEffect} from 'react';
import DisplayBorder from './DisplayBorder';
import NavigationBar from './NavigationBar';
import BackgroundMouseAnimation from './BackgroundMouseAnimation';
import Intro from './Intro';
import AboutUs from './AboutUs';
import GrandmasterMessage from './GrandmasterMessage'
import Sponsors from './Sponsors';
import { useMotionValueEvent, useScroll} from 'framer-motion';
import * as styles from './styles.module.css';

export const BlueScreenContext = createContext();

function Home() {
    const [blueBoxTransition, setBlueBoxTransition] = useState('first phase');
    const {scrollYProgress} = useScroll();

    const disableScrolling = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        window.onscroll = () => {
            window.scrollTo({top: scrollTop, behavior: 'instant'})
        }

        setTimeout(() => {
            window.onscroll = () => {}
        }, 500)
    }
    
    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        console.log(value);
        if(value >= 0.49 && value < 0.56)
            setBlueBoxTransition('first phase');
        else if(value >= 0.56 && value <= 0.569)
            setBlueBoxTransition('second phase')
    });

    useEffect(() => {
        disableScrolling();
    }, [blueBoxTransition])


    return(
        <section className={styles.home}>
            {/*<BackgroundMouseAnimation/> */}
            <DisplayBorder/>
            <NavigationBar/>
            <Intro/>
            <AboutUs/>
            <BlueScreenContext value={{blueBoxTransition, setBlueBoxTransition}}>
                <GrandmasterMessage/>
                <Sponsors/>                
            </BlueScreenContext>
        </section>
    )
}

export default Home;