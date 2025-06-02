import React from 'react';
import KnightIcon from './KnightIcon';
import {useScroll, useTransform, motion} from 'framer-motion';
import * as styles from './styles.module.css';

function Features() {
    const {scrollYProgress} = useScroll();
    const scale = useTransform(scrollYProgress, [0.45, 0.47], [0, 1]);

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