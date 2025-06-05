import React from 'react';
import WhoWeAre from './WhoWeAre';
import Features from './Features';
import * as styles from './styles.module.css';


/* 
    this is where i left off, i need to get the scroll position from the top of this element
    and use that to approximate when to animate its child components
*/

function AboutUs() {

    return(
        <article className={styles.container}>
            <WhoWeAre/>                    {/* line animation starts at scroll position 0.47 and ends at scroll position 0.49*/}
            <Features/>                     {/* line animation starts at scroll position 0.49 and ends at scroll position 0.51 */}
        </article>
    )
}

export default AboutUs;