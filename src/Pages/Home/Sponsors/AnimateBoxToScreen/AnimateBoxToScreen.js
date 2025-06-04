import React, {useEffect, useState, useContext} from 'react';
import AnimateScreen from './AnimateScreen';
import {motion, AnimatePresence} from 'framer-motion';
import {BlueScreenContext} from '-/Home.js'
import * as styles from './styles.module.css';


function AnimateBoxToScreen() {
    const {blueBoxTransition} = useContext(BlueScreenContext);
    const [mount, setMount] = useState(false);


    useEffect(() => {
        if(blueBoxTransition === 'first phase')
            setTimeout(() => {
                setMount(false) 
            }, 400)
        else
            setMount(true);
        
    }, [blueBoxTransition])

    return(
        <>
            {mount && <motion.div className={styles.block} layoutId='blue_block'/>}  
            <AnimatePresence>    
                {blueBoxTransition === 'second phase' && <AnimateScreen/>}
            </AnimatePresence>        
        </>

    )
}

export default AnimateBoxToScreen;