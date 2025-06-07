import React, {useRef, useEffect} from 'react';
import useMediaQuery from '~/Hooks/useMediaQuery'
import {motion} from 'framer-motion';

function AnimateLetter({letter, letterIndex}) {
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
                svgElement.setAttribute('width', bbox.width);                  
            })
        }, 200)
    }, [])

    return(
        <svg 
            xmlns='http://www.w3.org/2000/svg' 
            height={'90'}
            key={`${letter} ${letterIndex}`} 
            ref={svgRef}>
                <motion.text
                    x='50%'
                    y="45"
                    fill="none"
                    textAnchor='middle'
                    fontSize={'2rem'}
                    fontFamily="mulish"
                    dy=".3em"
                    stroke="white"
                    strokeWidth="2"
                    strokeDasharray="350"
                    variants={{
                        text_hidden: {
                            strokeDashoffset: 350, 
                            //fill: '#ffffff00'
                        },
                        write_text: {
                            strokeDashoffset: 0,
                            //fill: '#ffffff',
                            transition: {
                                type: 'tween',
                                duration: 1,
                            }
                        }
                    }}
                    ref={textRef}
                >
                    {letter}
                </motion.text>
        </svg>
    )
}

export default AnimateLetter;