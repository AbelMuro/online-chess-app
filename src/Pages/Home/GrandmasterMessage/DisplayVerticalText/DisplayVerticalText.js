import React, {useRef, useState} from 'react';
import CreateMapping from '~/assets/functions/CreateMapping.js';
import DisplayLetter from './DisplayLetter';
import {useScroll, useMotionValueEvent} from 'framer-motion';
import * as styles from './styles.module.css'

function DisplayVerticalText(){
    const text = useRef('GRANDMASTER'.split(''));
    const {scrollYProgress} = useScroll();
    const [displayedText, setDisplayedText] = useState([]);

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        if(value < 0.47 || value > 0.50) return;
        let mappedValue = CreateMapping(0.47, 0.50, 0, text.current.length, value);
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