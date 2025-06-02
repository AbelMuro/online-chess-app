import React, {useRef, useMemo} from 'react';
import AnimateLetter from './AnimateLetter';
import * as styles from './styles.module.css';


/* 
    i need to implement variants here and use staggerChildren
*/

function AnimateText(){
    const text = useRef('CHESS'.split(''));
    const repeat = useMemo(() => Array.from({length: 15}, (_, i) => i), []);

    return(
        <motion.h1 className={styles.title}>
            {text.current.map((letter, i) => {
                const repeatedLetters = repeat.map((_, i) => {
                    return(
                        <span key={i}>
                            {letter}
                        </span>
                    )
                })
                return (
                    <AnimateLetter key={`${letter} ${i}`} repeatedLetters={repeatedLetters} letter={letter}/>
                )
            })}
        </motion.h1>
    )
}

export default AnimateText;