import React, {useRef, useState, useContext} from 'react';
import { ThresholdContext } from '../../FAQ';
import AnimateText from './AnimateText';
import Accordion from './Accordion';
import {LayoutGroup, motion, useScroll, useTransform} from 'framer-motion'
import * as styles from './styles.module.css';


function AnimateScreen() {
    const {topThreshold} = useContext(ThresholdContext);
    const {scrollYProgress} = useScroll();
    const color = useTransform(scrollYProgress, [
        topThreshold + 0.02, 
        topThreshold + 0.04, 
        topThreshold + 0.06, 
        topThreshold + 0.08, 
        topThreshold + 0.10, 
        topThreshold + 0.12, 
        topThreshold + 0.14, 
        topThreshold + 0.16, 
        topThreshold + 0.18
    ], ['#0000ff', '#008000', '#ff0000', '#ffa500', '#ffff00', '#008000', '#ffc0cb', '#808080', '#add8e6']);
    const containerRef = useRef();


    scrollYProgress.on('change', (value) => {
        if(value >= 0.81)
            containerRef.current.style.position = 'sticky';
        else
            containerRef.current.style.position = 'fixed';
    })

    return (
            <motion.div 
                className={styles.screen} 
                layout
                initial={{width: '0%', height: '0vh'}} 
                exit={{width: 0, height: 0, transition: {duration: 0.4}}}
                animate={{width: '100%', height: '100vh', transition: {type: 'spring', stiffness: 80, damping: 12, delay: 0.4}}}
                style={{backgroundColor: color}}
                ref={containerRef}
                >
                    <div className={styles.screen_content}>
                        <LayoutGroup>
                            <AnimateText/>   
                            <Accordion question='Is this a real organization?' answer='No, this is a personal project of mine.'/> 
                            <Accordion question='What chess engine does this app use?' answer='It uses the Stockfish engine.'/>    
                            <Accordion question='Are you planning on updating this app in the future?' answer='I currently have no plans to integrate more features in the future, but that may change.'/>    
                            <Accordion question='Do you take any requests for implementing features?' answer='I will be more than happy to take requests from my users.'/>                   
                        </LayoutGroup>
                    </div>
            </motion.div>
    )     
    
}

export default AnimateScreen;