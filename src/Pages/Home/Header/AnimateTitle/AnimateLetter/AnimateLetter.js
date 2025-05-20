import React, {useRef, useEffect} from 'react';
import {motion} from 'framer-motion';
import useMediaQuery from '~/Hooks/useMediaQuery';
import { text_variant } from '../Variants';


//this is where i left off, i need to get the full size of the dash for strokedasharray and strokedashoffset of each letter
function AnimateLetter({letter, letterIndex, wordIndex}) {
    const [mobile] = useMediaQuery('(max-width: 700px)');
    const svgRef = useRef();
    const textRef = useRef();

    useEffect(() => {
        if(!svgRef.current || !textRef.current) return;

        const svgElement = svgRef.current;
        const textElement = textRef.current;

        setTimeout(() => {
            document.fonts.ready.then(() => {
                const bbox = textElement.getBBox();
                svgElement.setAttribute('width', bbox.width + 20);                  
            })
        }, 200)

    }, [mobile])

    return(
        <svg 
            xmlns='http://www.w3.org/2000/svg' 
            height={mobile ? '70' : '90'}
            key={`${letter} ${letterIndex}`} 
            ref={svgRef}>
                <motion.text
                    x='50%'
                    y="45"
                    fill="none"
                    textAnchor='middle'
                    fontSize={mobile ? '2.7rem' : '4rem'}
                    fontFamily="'amanda black'"
                    dy=".3em"
                    stroke="white"
                    strokeWidth="3"
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