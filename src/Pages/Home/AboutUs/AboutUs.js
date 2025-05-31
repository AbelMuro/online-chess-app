import React from 'react';
import WhoWeAre from './WhoWeAre';
import Features from './Features';
import * as styles from './styles.module.css';

function AboutUs() {

    return(
        <article className={styles.container}>
            <WhoWeAre/>                    {/* line animation starts at scroll position 0.43 and ends at scroll position 0.45*/}
            <Features/>
        </article>
    )
}

export default AboutUs;