import React, {createContext, useEffect, useState, useRef} from 'react';
import calculateScrollThreshold from '~/Common/Functions/calculateScrollThresholds.js';
import AnimationSequence from './AnimationSequence';
import * as styles from './styles.module.css';

export const ThresholdContext = createContext();

function Intro() {
    const [topThreshold, setTopThreshold] = useState(0);
    const containerRef = useRef();

    useEffect(() => {
        const node = containerRef.current;
        const offsetFromTop = node.offsetTop;
        const offsetHeight = node.offsetHeight;

        const [topThreshold] = calculateScrollThreshold(offsetFromTop, offsetHeight);

        setTopThreshold(topThreshold);
    }, [])

    return(
        <ThresholdContext.Provider value={{topThreshold}}>
            <header className={styles.container} ref={containerRef} id='intro'>
                <AnimationSequence/>
            </header>
        </ThresholdContext.Provider>
    )
}

export default Intro;