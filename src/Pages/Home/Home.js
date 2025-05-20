import React from 'react';
import NavigationBar from './NavigationBar';
import Header from './Header';
import * as styles from './styles.module.css';

//this is where i left off, i will need to update my notes on svg, and think
//of the next component to animate here

function Home() {
    return(
        <section className={styles.home}>
            <NavigationBar/>
            <Header/>
        </section>
    )
}

export default Home;