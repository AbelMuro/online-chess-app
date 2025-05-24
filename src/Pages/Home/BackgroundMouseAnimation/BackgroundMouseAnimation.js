import React, {useState, useEffect, useRef} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import * as styles from './styles.module.css';

function BackgroundMouseAnimation() {
    const [trail, setTrail] = useState([]);
    const timeoutRef = useRef();

    useEffect(() => {
        const mousemove = (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            setTrail((prev) => {
                if(prev.length >= 100)
                    return [...prev.slice(-10), { x: mouseX, y: mouseY, id: Date.now()}]
                else
                    return [...prev, { x: mouseX, y: mouseY, id: Date.now()}]
                
            });

            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                setTrail([]);
            }, 300)
        }

        document.addEventListener('mousemove', mousemove);

        return () => {
            document.removeEventListener('mousemove', mousemove);
        }
    }, [])


    return(
        <section className={styles.container}>
             <AnimatePresence>
                {
                    trail.map(({ x, y, id }, i) => {
                        const filters = ['#smokeEffectOne', '#smokeEffectTwo', '#smokeEffectThree'];
                        const values = [2, 4, 6]
                        const filter = filters[i % 3];

                        return(
                            <motion.div
                                key={`${id} ${i}`}
                                className={styles.trailing_smoke}
                                initial={{ opacity: 0.1, scale: 0 }}
                                animate={{ opacity: 0.6, scale: values[i % 3], display: 'none' }}
                                exit={{ opacity: 0, scale: values[i % 3]}}
                                transition={{ duration: 0.8}}
                                style={{
                                    top: y,
                                    left: x,
                                    filter: `url(${filter})`,
                                }}
                            />                            
                        )

                    })
                }
             </AnimatePresence>
            <svg width='0' height='0' xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id="smokeEffectOne">
                            <feTurbulence type="fractalNoise" baseFrequency="0.08 0.1" numOctaves="138" result="noise"/>
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale="10"/>
                        </filter>
                        <filter id="smokeEffectTwo">
                            <feTurbulence type="fractalNoise" baseFrequency="0.1 0.1" numOctaves="102" result="noise" seed="7"/>
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale="27"/>
                        </filter>
                        <filter id="smokeEffectThree">
                            <feTurbulence type="turbulence" baseFrequency="0.1" numOctaves="162" result="noise" seed="12"/>
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale="17"/>
                        </filter>
                    </defs>            
            </svg>
        </section>
    )
}

export default BackgroundMouseAnimation