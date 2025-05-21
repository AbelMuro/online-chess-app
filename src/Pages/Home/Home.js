import React from 'react';
import NavigationBar from './NavigationBar';
import Header from './Header';
import Features from './Features';
import * as styles from './styles.module.css';

function Home() {
    return(
        <section className={styles.home}>
            <NavigationBar/>
            <Header/>
            <Features/>
        </section>
    )
}

export default Home;