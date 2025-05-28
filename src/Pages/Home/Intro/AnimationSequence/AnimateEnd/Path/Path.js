import React, {useEffect, useRef} from 'react';
import CreateMapping from '~/assets/functions/CreateMapping.js';
import {motion, useScroll, useMotionValueEvent, useMotionValue, easeInOut} from 'framer-motion';
import * as styles from './styles.module.css';

function Path({d, transform}) {
    const {scrollYProgress} = useScroll();
    const commands = useMotionValue();
    const pathCommandsArray = useRef([]);
    const pathInnerRef = useRef();
    const pathOuterRef = useRef();


    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        if(value < 0.20){
            commands.set([]);
            return;
        }
        else if (value > 0.43){
           commands.set(pathCommandsArray.current)
           return; 
        }

        let mappedValue = CreateMapping(0.20, 0.43, 0, pathCommandsArray.current.length - 1, value);
        mappedValue = Math.floor(mappedValue);
        if(mappedValue > pathCommandsArray.current.length - 1) return;
        const allCurrentCommands = pathCommandsArray.current.slice(0, mappedValue);
        commands.set(allCurrentCommands)
    })



    const getPathCommandsAsArray = (pathString) => {
        const commands = pathString.split(/\s(?=[A-Z])/); // Split on spaces before a command letter (e.g., "M", "C", "L")
        const pathVariants = [];
        let currentPath = ""; 

        commands.forEach((cmd) => {
            currentPath += ` ${cmd.trim()}`; // Append new command to previous path
            pathVariants.push(currentPath.trim()); // Store the updated path
        });

        return pathVariants; 
    }



    useEffect(() => {
        pathCommandsArray.current = getPathCommandsAsArray(d);
    }, [])

    return(
        <>
            <motion.path d={commands} transform={transform} ref={pathInnerRef} fill='none' stroke='blue' strokeWidth='6'/> 
            <motion.path d={commands} transform={transform} ref={pathOuterRef} fill='none' stroke='blue' strokeWidth='43' filter={`url(#glowEffect)`}/>   
        </>
        
    )
}

export default Path;