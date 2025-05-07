import React from 'react';
import NavigationBar from './NavigationBar';
import * as styles from './styles.module.css';

function Home() {
    return(
        <section className={styles.home}>
            <NavigationBar/>
        </section>
    )
}

export default Home;