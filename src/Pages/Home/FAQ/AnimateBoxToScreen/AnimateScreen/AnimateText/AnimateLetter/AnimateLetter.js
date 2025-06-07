import React, {useRef, useMemo, useEffect} from "react";
import {motion, useMotionValue} from 'framer-motion';
import useMediaQuery from '~/Hooks/useMediaQuery';
import * as styles from './styles.module.css';

function AnimateLetter({letter}) {
    const [tablet] = useMediaQuery('(max-width: 960px)');
    const [mobile] = useMediaQuery('(max-width: 600px)');
    const containerRef = useRef();
    const x = useMotionValue(0);     
    const repeat = useMemo(() => Array.from({length: 15}, (_, i) => i), []);
    const repeatedLetters = useMemo(() => repeat.map((_, i) => {
            return(
                <p key={i}>
                    <span>
                       {letter} 
                    </span>
                </p>
            )
    }), [])

    x.on('change', (value) => {
        if(!containerRef.current) return;
        containerRef.current.scrollTo({top: value, behavior: 'smooth'});
    })

    useEffect(() => {
        const handleResize = () => {
            if(!containerRef.current) return;

            requestAnimationFrame(() => {
                const scrollHeight = containerRef.current.scrollHeight;
                containerRef.current.scrollTo({top: scrollHeight, behavior: 'smooth'});                
            })
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return(       
        <div className={styles.container}>
            <div className={styles.letter} ref={containerRef}>
                {repeatedLetters}
            </div>
            <motion.div 
                className={styles.ignore} 
                variants={{
                    initial: {x: 0}, 
                    end: {x: 4500}
                }} 
                style={{x}}/>        
        </div>             
    )
}

export default AnimateLetter;