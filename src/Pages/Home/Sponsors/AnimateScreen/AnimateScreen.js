import React, {useEffect, useContext, useState} from 'react';
import { BlueScreenContext } from '-/Home';
import {AnimatePresence, motion, useAnimationControls} from 'framer-motion'
import * as styles from './styles.module.css';

/* 

    i also need to fix some visual bugs on the AnimateBlock component

    there are still some bugs that i need to fix with the animateScreen component,
    especially with the transition that happens when scrolling from AnimateBlock to
    AnimateScreen

    For now, i can focus on displaying a large title that animates like a slot machine
    in the Blue screen
*/

function AnimateScreen() {
    const {blueBoxTransition} = useContext(BlueScreenContext);
    const [mount, setMount] = useState(false);
    const controlsWidth = useAnimationControls();

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

    return (
            <>
                {mount && <motion.div className={styles.block} layoutId='blue_block'/>}  
                <AnimatePresence>
                    {blueBoxTransition === 'second phase' && 
                        <motion.div 
                            className={styles.screen} 
                            initial={{width: 0, height: 0}} 
                            exit={{width: 0, height: 0, transition: {duration: 0.4}}}
                            animate={{width: '100%', height: '100vh', transition: {type: 'spring', stiffness: 80, damping: 12, delay: 0.4}}}>


                                
                        </motion.div>}
                </AnimatePresence>
            </>
    )     
    
}

export default AnimateScreen;