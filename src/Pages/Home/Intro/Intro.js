import React, {useEffect} from 'react';
import Header from './Header';
import { useAnimationControls } from 'framer-motion';
import * as styles from './styles.module.css';

function Intro() {

    return(
        <section className={styles.container}>
            <Header/>
        </section>
    )
}

export default Intro;