import React, {useEffect, useRef} from 'react';
import {motion} from 'framer-motion';
import * as styles from './styles.module.css';

function Path(props) {
    const d = props.d;
    const pathLength = useRef('');
    const pathRef = useRef();
        

    useEffect(() => {
        pathLength.current = pathRef.current.getTotalLength();
    }, [])

    return(
        <>
            
            <motion.path {...props} ref={pathRef} stroke='blue' strokeWidth='2' filter={`url(#glowEffect)`}/>   
        </>
        
    )
}

export default Path;