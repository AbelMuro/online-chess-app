import React from 'react';
import AnimateTitle from './AnimateTitle';
import AnimateStartButton from './AnimateStartButton';
import AnimateWorld from './AnimateWorld';
import AnimateChessboard from './AnimateChessboard';
import * as styles from './styles.module.css';

/* i need to finish the zoom-in animation for the world svg element 
   then i will need to design the next scrolling animation feature

   also, update notes for framer-motion on the ease functions and for
   SVG elements on the viewBox attribute
*/

function AnimationSequence() {
    return(        
        <header className={styles.header}>
            <AnimateTitle/>
            <AnimateStartButton/>
            <AnimateWorld/>
            <AnimateChessboard/>
        </header>
    )
}

export default AnimationSequence;