import React from 'react';
import AnimateTitle from './AnimateTitle';
import AnimateStartButton from './AnimateStartButton';
import AnimateWorld from './AnimateWorld';
import AnimateIntroductionParagraph from './AnimateIntroductionParagraph';
import AnimateGlowingText from './AnimateGlowingText';
import AnimateEnd from './AnimateEnd';
import {useScroll, useMotionValueEvent} from 'framer-motion';
import * as styles from './styles.module.css';

/* i need to finish the zoom-in animation for the world svg element 
   then i will need to design the next scrolling animation feature

   also, update notes for framer-motion on the ease functions and for
   SVG elements on the viewBox attribute
*/

function AnimationSequence() {
    const {scrollYProgress} = useScroll();

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        console.log(value);
    })
    

    return(        
        <header className={styles.header}>
            <AnimateTitle/>                     {/* initial animation and ends at scroll position 0.12 */}
            <AnimateStartButton/>               {/* initial animation and ends at scroll position 0.12 */}
            <AnimateWorld/>                     {/* initial animation and ends at scroll position 0.20 */}            
            <AnimateIntroductionParagraph/>     {/* animation starts at scroll position 0.13 and ends at scroll position 0.40*/}
            <AnimateGlowingText/>               {/* animation starts at scroll position 0.40 */}
            <AnimateEnd/>                       {/* animation starts at scroll position 0.20 */}
        </header>
    )
}

export default  AnimationSequence;