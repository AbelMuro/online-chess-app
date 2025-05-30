import React from 'react';
import DisplayBorder from './DisplayBorder';
import NavigationBar from './NavigationBar';
import BackgroundMouseAnimation from './BackgroundMouseAnimation';
import Intro from './Intro';
import AboutUs from './AboutUs';
import * as styles from './styles.module.css';

function Home() {

    return(
        <section className={styles.home}>
            <BackgroundMouseAnimation/>
            <DisplayBorder/>
            <NavigationBar/>
            <Intro/>
            <AboutUs/>
        </section>
    )
}

export default Home;