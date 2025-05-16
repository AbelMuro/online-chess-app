import React, {useRef, useEffect} from 'react';
import {motion} from 'framer-motion';
import useMediaQuery from '~/Hooks/useMediaQuery';
import { text_variant } from '../Variants';
import * as styles from './styles.module.css';


//the problem here is that the size of each letter in mobile displays while in desktop
//and the size of each letter in desktop appears in mobile
function AnimateLetter({letter, letterIndex, wordIndex}) {
    const [mobile] = useMediaQuery('(max-width: 700px)');
    const svgRef = useRef();
    const textRef = useRef();

    useEffect(() => {
        if(!svgRef.current || !textRef.current) return;

        const svgElement = svgRef.current;
        const textElement = textRef.current;

        document.fonts.ready.then(() => {
            const bbox = textElement.getBBox();
            svgElement.setAttribute('width', bbox.width + 20);
        })

    }, [mobile])

    return(
        <svg 
            xmlns='http://www.w3.org/2000/svg' 
            height={mobile ? '70' : '90'}
            key={`${letter} ${letterIndex}`} 
            ref={svgRef}>
                <motion.text
                    className={styles.letter}
                    x='50%'
                    y="45"
                    fill="none"
                    textAnchor='middle'
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