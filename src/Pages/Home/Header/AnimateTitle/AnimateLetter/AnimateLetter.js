import React, {useRef, useEffect} from 'react';
import {motion} from 'framer-motion';
import { text_variant } from '../Variants';

function AnimateLetter({letter, letterIndex, wordIndex}) {
    const svgRef = useRef();
    const textRef = useRef();

    useEffect(() => {
        if(!svgRef.current || !textRef.current) return;

        const svgElement = svgRef.current;
        const textElement = textRef.current;
        const rect = textElement.getBoundingClientRect();
        const increaseByAmount = (letterIndex === 0 && wordIndex === 0) ? 65 : 25
        svgElement.setAttribute('width', Number(rect.width) + increaseByAmount);
    }, [])

    return(
        <svg height="90" key={`${letter} ${letterIndex}`} ref={svgRef}>
            <motion.text
                x='50%'
                y="45"
                fill="none"
                textAnchor='middle'
                dy=".3em"
                fontFamily="'amanda black', sans serif"
                fontSize="60"
                stroke="white"
                strokeWidth="1"
                strokeDasharray="300"
                variants={text_variant}
                ref={textRef}
            >
                {letter}
            </motion.text>
        </svg>
    )
}

export default AnimateLetter;