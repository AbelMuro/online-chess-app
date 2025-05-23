import React from 'react';
import BackgroundMouseAnimation from './BackgroundMouseAnimation';
import NavigationBar from './NavigationBar';
import Header from './Header';
import Features from './Features';
import * as styles from './styles.module.css';

function Home() {
    return(
        <section className={styles.home}>
            <BackgroundMouseAnimation/>
            <NavigationBar/>
            <Header/>
        </section>
    )
}

export default Home;