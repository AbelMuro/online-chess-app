import React, {useEffect, useState, useRef, createContext} from 'react';
import calculateScrollThresholds from '~/assets/functions/calculateScrollThresholds.js';
import AnimateBoxToScreen from './AnimateBoxToScreen';
import * as styles from './styles.module.css';

export const ThresholdContext = createContext();

function FAQ() {
    const [topThreshold, setTopThreshold] = useState(0);
    const [bottomThreshold, setBottomThreshold] = useState(0);
    const containerRef = useRef();

    useEffect(() => {
        if(!containerRef.current) return;

        const offsetFromTop = containerRef.current.offsetTop;
        const offsetHeight = containerRef.current.offsetHeight;

        const [topThreshold, bottomThreshold] = calculateScrollThresholds(offsetFromTop, offsetHeight);
        setTopThreshold(topThreshold);
        setBottomThreshold(bottomThreshold);
    }, [])

    return(
        <ThresholdContext value={{topThreshold, bottomThreshold}}>
            <section className={styles.container} ref={containerRef}>
                <AnimateBoxToScreen/>
            </section>
        </ThresholdContext>
    )
}

export default FAQ;