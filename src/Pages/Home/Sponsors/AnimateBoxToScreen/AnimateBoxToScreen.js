import React, {useEffect, useState, useContext} from 'react';
import AnimateScreen from './AnimateScreen';
import {motion, AnimatePresence} from 'framer-motion';
import {BlueScreenContext} from '-/Home.js'
import * as styles from './styles.module.css';


function AnimateBoxToScreen() {
    const {blueBoxTransition} = useContext(BlueScreenContext);
    const [mount, setMount] = useState(false);

    const handleScrolling = () => {
        const handleWheel = (e) => e.preventDefault();
        const touchmove = (e) => e.preventDefault();

        document.addEventListener("wheel", handleWheel, { passive: false });
        document.addEventListener("touchmove", touchmove, { passive: false });

        setTimeout(() => {
            document.removeEventListener("wheel", handleWheel);
            document.removeEventListener("touchmove", touchmove);
        }, 400)
    }

    useEffect(() => {
        if(blueBoxTransition === 'first phase'){
            handleScrolling();
            setTimeout(() => {
                setMount(false) 
            }, 400)
        }
        else{
            handleScrolling();
            setMount(true);
        }
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