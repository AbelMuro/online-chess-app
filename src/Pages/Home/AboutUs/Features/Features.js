import React from 'react';
import KnightIcon from './KnightIcon';
import CreateMapping from '~/assets/functions/CreateMapping.js';
import {useScroll, useMotionValue, useMotionValueEvent, motion} from 'framer-motion';
import * as styles from './styles.module.css';

function Features() {
    const {scrollYProgress} = useScroll();
    const scale = useMotionValue(0);

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        if(value < 0.45 || value > 0.47) return;

        const mappedValue = CreateMapping(0.45, 0.47, 0, 1, value);
        scale.set(mappedValue);
    })

    return(
        <section className={styles.container}>
            <div className={styles.line_container}>
                <motion.div className={styles.north_east_line} style={{scaleY: scale}}>
                    <div className={styles.glow}/>
                </motion.div>
            </div>
            <div className={styles.line_container}>
                <motion.div className={styles.north_west_line}  style={{scaleY: scale}}>
                    <div className={styles.glow}/>
                </motion.div>                
            </div>            
            <KnightIcon/>
            <p className={styles.desc}>
                Play with your friends
                or with the almighty Stockfish
                engine!
            </p>

        </section>
    )
}

export default Features;