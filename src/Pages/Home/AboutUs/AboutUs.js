import React from 'react';
import WhoWeAre from './WhoWeAre';
import {useScroll, motion, useMotionValue} from 'framer-motion';
import * as styles from './styles.module.css';

function AboutUs() {
    const {scrollYProgress} = useScroll();

    return(
        <article className={styles.container}>
            <WhoWeAre/>                    {/* line animation starts at scroll position 0.43 and ends at scroll position 0.45*/}
        </article>
    )
}

export default AboutUs;