import React from 'react';
import AnimateTitle from './AnimateTitle';
import AnimateStartButton from './AnimateStartButton';
import AnimateWorld from './AnimateWorld';
import AnimateIntroductionParagraph from './AnimateIntroductionParagraph';
import AnimateGlowingText from './AnimateGlowingText';
import AnimateOctagon from './AnimateOctagon';
import * as styles from './styles.module.css';


function AnimationSequence() {

    return(        
        <section className={styles.header}>
            <AnimateTitle/>                     {/* initial animation and ends at scroll position 0.12 */}
            <AnimateStartButton/>               {/* initial animation and ends at scroll position 0.12 */}
            <AnimateWorld/>                     {/* initial animation and ends at scroll position 0.20 */}            
            <AnimateIntroductionParagraph/>     {/* animation starts at scroll position 0.13 and ends at scroll position 0.40*/}
            <AnimateGlowingText/>               {/* animation starts at scroll position 0.40 and ends at scroll position 0.42*/}
            <AnimateOctagon/>                   {/* animation starts at scroll position 0.20 and ends at scroll position 0.40*/}
        </section>
    )
}

export default  AnimationSequence;