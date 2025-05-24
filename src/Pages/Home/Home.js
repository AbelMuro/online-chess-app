import React from 'react';
import BackgroundMouseAnimation from './BackgroundMouseAnimation';
import NavigationBar from './NavigationBar';
import Intro from './Intro';
import Features from './Features';
import * as styles from './styles.module.css';

function Home() {
    return(
        <section className={styles.home}>
            <BackgroundMouseAnimation/>
            <NavigationBar/>
            <Intro/>
        </section>
    )
}

export default Home;