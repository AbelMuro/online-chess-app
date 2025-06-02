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
    
    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        console.log(value);
        if(value < 0.56)
            setBlueBoxTransition('first phase');
        else
            setBlueBoxTransition('second phase')
    });


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