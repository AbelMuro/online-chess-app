import React, {useEffect, useState, useRef, createContext} from 'react';
import WhoWeAre from './WhoWeAre';
import Features from './Features';
import calculateScrollThreshold from '~/Common/Functions/calculateScrollThresholds.js';
import * as styles from './styles.module.css';

export const ThresholdContext = createContext()

function AboutUs() {
    const [topThreshold, setTopThreshold] = useState(0);
    const containerRef = useRef();

    useEffect(() => {
        if(!containerRef.current) return;

        const node = containerRef.current;
        const offsetFromTop = node.offsetTop;                                                // the space between the top border of the element and the top of the page
        const offsetHeight = node.offsetHeight;                                              // the full height of the element

        const [topThreshold] = calculateScrollThreshold(offsetFromTop, offsetHeight);
        setTopThreshold(topThreshold);
    }, [])

    return(
        <ThresholdContext value={{topThreshold}}>
            <article className={styles.container} ref={containerRef} id='about-us'>
                <WhoWeAre />                     {/* line animation starts at scroll position 0.47 and ends at scroll position 0.49*/}
                <Features />                     {/* line animation starts at scroll position 0.49 and ends at scroll position 0.51 */}
            </article>
        </ThresholdContext>

    )
}

export default AboutUs;