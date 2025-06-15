import React, {useEffect, createContext, useRef, useState} from 'react';
import calculateScrollThreshold from '~/Common/Functions/calculateScrollThresholds';
import DisplayVerticalText from './DisplayVerticalText';
import IndividualMessage from './IndividualMessage';
import AnimateBox from './AnimateBox';
import * as styles from './styles.module.css';

export const ThresholdContext = createContext();

function GrandmasterMessage() {
    const containerRef = useRef();
    const [topThreshold, setTopThreshold] = useState(0);
    const [bottomThreshold, setBottomThreshold] = useState(0);


    useEffect(() => {
        if(!containerRef.current) return;

        const node = containerRef.current;
        const offsetFromTop = node.offsetTop;
        const offsetHeight = node.offsetHeight;

        const [topThreshold, bottomThreshold] = calculateScrollThreshold(offsetFromTop, offsetHeight);
        setTopThreshold(topThreshold);
        setBottomThreshold(bottomThreshold);
    }, [])

    return(
        <ThresholdContext.Provider value={{topThreshold, bottomThreshold}}>
            <section className={styles.container} ref={containerRef}>
                <DisplayVerticalText/>
                <AnimateBox/>
                <div className={styles.message_container}>
                    <IndividualMessage message={'[Become a grandmaster today!]'} animationStart={topThreshold + 0.02}/>
                    <IndividualMessage message={'[Challenge the stockfish engine!]'} animationStart={topThreshold + 0.03}/>
                    <IndividualMessage message={'[Expand your knowledge!]'} animationStart={topThreshold + 0.04}/>  
                </div>
            </section>            
        </ThresholdContext.Provider>

    )
}

export default GrandmasterMessage;