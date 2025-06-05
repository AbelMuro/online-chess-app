import React, {useRef, useState, useContext} from 'react';
import { ThresholdContext } from '../GrandmasterMessage';
import CreateMapping from '~/assets/functions/CreateMapping.js';
import DisplayLetter from './DisplayLetter';
import {useScroll, useMotionValueEvent} from 'framer-motion';
import * as styles from './styles.module.css'

function DisplayVerticalText(){
    const {topThreshold} = useContext(ThresholdContext);
    const text = useRef('GRANDMASTER'.split(''));
    const {scrollYProgress} = useScroll();
    const [displayedText, setDisplayedText] = useState([]);

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        const from = topThreshold;
        const to = topThreshold + 0.03;

        if(value < from || value > to) return;
        let mappedValue = CreateMapping(from, to, 0, text.current.length, value);
        mappedValue = Math.round(mappedValue);
        setDisplayedText(text.current.slice(0, mappedValue));
    })

    return(
        <p className={styles.grandmaster}>
            {displayedText.map((letter, i) => {
                return (
                    <DisplayLetter key={`${letter} ${i}`} letter={letter}/>
                )
            })}
        </p>
    )

}

export default DisplayVerticalText;