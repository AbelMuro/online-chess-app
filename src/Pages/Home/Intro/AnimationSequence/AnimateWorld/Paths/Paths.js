import React, {useRef, useEffect} from 'react';
import getPathCommandsAsArray from '~/assets/functions/GetPathCommandsAsArray.js';
import CreateMapping from '~/assets/functions/CreateMapping.js'
import { useMotionValue, useScroll, motion, useMotionValueEvent} from 'framer-motion';

function Paths(props) {
    const d = props.d;
    const {scrollYProgress} = useScroll();
    const pathRef = useRef();
    const pathCommandsArray = useRef([])
    const dCommands = useMotionValue('');

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        if(value > 0.20) {
            pathRef.current.style.opacity = '0'
            return;
        }
        pathRef.current.style.opacity = '1'
        let mappedValue = CreateMapping(0, 0.20, pathCommandsArray.current.length - 1, 0, value);
        mappedValue = Math.floor(mappedValue);
        if(mappedValue > pathCommandsArray.current.length - 1) return;
        const allAnimatedCommands = pathCommandsArray.current.slice(0, mappedValue);
        dCommands.set(allAnimatedCommands);
    })

    useEffect(() => {
        pathCommandsArray.current = getPathCommandsAsArray(d);
    }, [])


    return(
        <motion.path {...props} d={dCommands}  fill='none' stroke={'blue'} strokeWidth={'1'} ref={pathRef} />
    )
}

export default Paths;