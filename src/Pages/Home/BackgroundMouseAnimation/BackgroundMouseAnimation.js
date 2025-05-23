import React, {useState, useEffect, useRef} from 'react';
import {motion} from 'framer-motion';
import * as styles from './styles.module.css';

function BackgroundMouseAnimation() {
    const [trail, setTrail] = useState([]);

    useEffect(() => {
        const mousemove = (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            setTrail((prev) => [
                ...prev,
                { x: mouseX, y: mouseY, id: Date.now()}
            ]);
        }

        document.addEventListener('mousemove', mousemove);

        return () => {
            document.removeEventListener('mousemove', mousemove);
        }
    }, [])


    return(
        <section className={styles.container}>
            {
                trail.map(({ x, y, id }, i) => (
                    <motion.div
                        key={`${id} ${i}`}
                        className={styles.trailing_smoke}
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ opacity: 0, scale: 2 }}
                        transition={{ duration: 0.5}}
                        style={{
                            top: y,
                            left: x,
                            filter: 'url(#smokeEffect)',
                        }}
                    />
                ))
            }

            <svg width='0' height='0' xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id="smokeEffect">
                            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.1" numOctaves="5" result="noise"/>
                            <feGaussianBlur in="noise" stdDeviation="8" result="blurred"/>
                            <feDisplacementMap in="SourceGraphic" in2="blurred" scale="130"/>
                        </filter>
                    </defs>            
            </svg>
        </section>
    )
}

export default BackgroundMouseAnimation