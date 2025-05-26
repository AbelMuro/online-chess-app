import React, {useRef, useEffect} from 'react';
import CreateMapping from '~/assets/functions/CreateMapping.js'
import { useMotionValue, useScroll, motion, useMotionValueEvent , useTransform} from 'framer-motion';

function Paths({d, stroke, strokeWidth, transform}) {
    const {scrollYProgress} = useScroll();
    const pathRef = useRef();
    const strokeDasharray = useRef(0);
    const strokeDashoffset = useMotionValue(strokeDasharray.current);

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        if(value > 0.20) {
            pathRef.current.style.opacity = '0'
            return
        }
        else
            pathRef.current.style.opacity = '1'

        const mappedValue = CreateMapping(0, 0.20, 0, strokeDasharray.current, value);
        strokeDashoffset.set(mappedValue);
    })


    useEffect(() => {
        if(!pathRef.current) return;

        const path = pathRef.current;
        const pathLength = path.getTotalLength();
        strokeDasharray.current = pathLength + 15;
        path.setAttribute('stroke-dasharray', pathLength + 15);   
    }, [])

    return(
        <motion.path d={d} stroke={stroke} strokeWidth={strokeWidth} transform={transform} ref={pathRef} style={{strokeDashoffset}}/>
    )
}

export default Paths;