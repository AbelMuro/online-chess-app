import React, {useEffect, useRef} from 'react';
import CreateMapping from '~/assets/functions/CreateMapping.js';
import paths from './Drawings';
import {useScroll, useAnimationControls, motion, useMotionValue, useMotionValueEvent} from 'framer-motion';
import * as styles from './styles.module.css';

function AnimateWorld({viewBox}) {
    const svgContainer = useRef();
    const pathElements = useRef([]);
    const controls = useAnimationControls();


    useEffect(() => {
        if(!svgContainer.current) return;

        const svg = svgContainer.current;
        const paths = svg.childNodes;
        pathElements.current = paths;
        paths.forEach((path) => {
            const pathLength = path.getTotalLength();
            path.setAttribute('stroke-dasharray', pathLength + 5);
            path.setAttribute('stroke-dashoffset', pathLength + 5);          
        })
        requestAnimationFrame(() => {
            controls.start({strokeDashoffset: 0, transition: {duration: 6, delay: 0.4}});  
        })
            
    }, [])

    return(
        <motion.svg 
            version="1.1" 
            viewBox={viewBox}
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg" 
            className={styles.container} 
            ref={svgContainer} 
            animate={controls}>
            {/* outline and north/south america*/}
            <motion.path animate={controls} d={paths.outline_and_americas} fill="none" stroke="#000070" strokeWidth="3" transform="translate(520,150)"/>
            {/* africa, europe, and asia */}
            <motion.path animate={controls} d={paths.africa_europe_asia} fill="none" stroke="#000070" strokeWidth="3" transform="translate(613.83203125,230.6796875)"/>
            {/* green land*/}
            <motion.path animate={controls} d={paths.greenland} fill="none" stroke="#000070" strokeWidth="3" transform="translate(467.0625,205.5625)"/>

            {/* madagascar */}
            <motion.path animate={controls} d={paths.madagascar} fill="none" stroke="#000070" strokeWidth="3" transform="translate(702,654)"/>
            {/* lake in asia*/}
            <motion.path animate={controls} d={paths.lake_in_asia} fill="none" stroke="#000070" strokeWidth="3" transform="translate(698,328)"/>

            <motion.path animate={controls} d="M0 0 C5.89252706 3.03685143 11.9602426 6.81341078 15.66796875 12.375 C17.55744951 13.09323148 17.55744951 13.09323148 19.66796875 13.4375 C23.46295736 14.16998861 23.46295736 14.16998861 25.66796875 16.375 C26.10546875 18.75 26.10546875 18.75 25.66796875 21.375 C23.79296875 23.75 23.79296875 23.75 20.66796875 25.375 C15.63921426 25.80173291 11.19943028 25.26447086 7.23046875 22 C5.89583333 20.6328125 4.56119792 19.265625 3.2265625 17.8984375 C1.59959992 16.30817332 -0.09201097 14.84028023 -1.83203125 13.375 C-3.59870204 11.88727723 -5.29270652 10.41530053 -6.90625 8.76171875 C-9.7518643 5.99406648 -12.62624967 5.375 -16.51953125 5.375 C-17.44765625 5.375 -18.37578125 5.375 -19.33203125 5.375 C-19.99203125 4.715 -20.65203125 4.055 -21.33203125 3.375 C-21.26953125 1.4375 -21.26953125 1.4375 -20.33203125 -0.625 C-14.26004038 -5.96099198 -6.63461247 -2.79785208 0 0 Z " fill="none" stroke="#000070" strokeWidth="3" transform="translate(224.33203125,450.625)"/>
            <motion.path animate={controls} d="M0 0 C1.25 1.5625 1.25 1.5625 2 4 C-0.83061584 10.48682797 -4.88725599 14.03761791 -10.875 17.8125 C-14.76748766 19.29164531 -17.89621658 19.84681245 -22 19 C-24.91535589 17.66585408 -25.83682885 16.59580538 -28 14 C-28.85841742 10.88128923 -28.58317716 9.34001464 -28 6 C-25.28501325 2.6911099 -23.45352233 2.08314576 -19.25 1.3125 C-17.83394815 1.20028457 -16.4172087 1.09651242 -15 1 C-13.45778963 0.81702589 -11.91611387 0.62949062 -10.375 0.4375 C-6.90012377 0.05207179 -3.49986476 -0.08974012 0 0 Z M-22 10 C-21.34 10.66 -20.68 11.32 -20 12 C-14.96494948 11.76135558 -14.96494948 11.76135558 -11 9 C-13.49064888 8.31292445 -15.37886292 8 -18 8 C-19.46225016 7.90754997 -19.46225016 7.90754997 -22 10 Z " fill="none" stroke="#000070" strokeWidth="3" transform="translate(454,249)"/>
            <motion.path animate={controls} d="M0 0 C3 0.125 3 0.125 6 1 C8.8242289 5.42011166 9.46870894 10.93313905 8.68359375 16.0703125 C7.8991643 19.022732 7.179344 20.820656 5 23 C1.875 23.125 1.875 23.125 -1 23 C-3.95949775 17.91336325 -5.78353363 14.04440226 -5 8 C-3.64184747 4.72808708 -2.50104494 2.50104494 0 0 Z " fill="none" stroke="#000070" strokeWidth="3" transform="translate(836,532)"/>
            <motion.path animate={controls} d="M0 0 C2.625 0.375 2.625 0.375 5 1 C5.625 2.875 5.625 2.875 6 5 C5.34 5.66 4.68 6.32 4 7 C1.375 6.625 1.375 6.625 -1 6 C-1.625 4.125 -1.625 4.125 -2 2 C-1.34 1.34 -0.68 0.68 0 0 Z " fill="none" stroke="#000070" strokeWidth="3" transform="translate(253,471)"/>
            <motion.path animate={controls} d="M0 0 C0.33 0 0.66 0 1 0 C1 1.65 1 3.3 1 5 C0.67 5 0.34 5 0 5 C0 3.35 0 1.7 0 0 Z " fill="none" stroke="#000070" strokeWidth="3" transform="translate(416,487)"/>
            <motion.path animate={controls} d="M0 0 C0.33 0 0.66 0 1 0 C1 1.65 1 3.3 1 5 C0.67 5 0.34 5 0 5 C0 3.35 0 1.7 0 0 Z " fill="none" stroke="#000070" strokeWidth="3" transform="translate(325,284)"/>
            <motion.path animate={controls} d="M0 0 C0.99 0.495 0.99 0.495 2 1 C1.34 1.66 0.68 2.32 0 3 C0 2.01 0 1.02 0 0 Z " fill="none" stroke="#000070" strokeWidth="3" transform="translate(636,434)"/>
            <motion.path animate={controls} d="M0 0 C1 4 1 4 1 4 Z " fill="none" stroke="#000070" strokeWidth="3" transform="translate(856,426)"/>
            <motion.path animate={controls} d="M0 0 C3 1 3 1 3 1 Z " fill="none" stroke="#000070" strokeWidth="3" transform="translate(725,443)"/>
            <motion.path animate={controls} d="M0 0 C3 1 3 1 3 1 Z " fill="none" stroke="#000070" strokeWidth="3" transform="translate(616,391)"/>

            <motion.path animate={controls} d="M0 0 C3 1 3 1 3 1 Z " fill="none" stroke="#000070" strokeWidth="3" transform="translate(577,216)"/>
            <motion.path animate={controls} d="M0 0 C2 1 2 1 2 1 Z " fill="none" stroke="#000070" strokeWidth="3" transform="translate(586,857)"/>
            <motion.path animate={controls} d="M0 0 C2 1 2 1 2 1 Z " fill="none" stroke="#000070" strokeWidth="3" transform="translate(406,849)"/>
            <motion.path animate={controls} d="M0 0 C2 1 2 1 2 1 Z " fill="none" stroke="#000070" strokeWidth="3" transform="translate(614,420)"/>
            <motion.path animate={controls} d="M0 0 C2 1 2 1 2 1 Z " fill="none" stroke="#000070" strokeWidth="3" transform="translate(597,409)"/>
            <motion.path animate={controls} d="M0 0 C2 1 2 1 2 1 Z " fill="none" stroke="#000070" strokeWidth="3" transform="translate(582,401)"/>
            <motion.path animate={controls} d="M0 0 C2 1 2 1 2 1 Z " fill="none" stroke="#000070" strokeWidth="3" transform="translate(477,399)"/>

            <motion.path animate={controls} d="M0 0 C2 1 2 1 2 1 Z " fill="none" stroke="#000070" strokeWidth="3" transform="translate(605,372)"/>
            <motion.path animate={controls} d="M0 0 C2 1 2 1 2 1 Z " fill="none" stroke="#000070" strokeWidth="3" transform="translate(307,312)"/>

            <motion.path animate={controls} d="M0 0 C2 1 2 1 2 1 Z " fill="none" stroke="#000070" strokeWidth="3" transform="translate(573,260)"/>

            <motion.path animate={controls} d="M0 0 C2 1 2 1 2 1 Z " fill="none" stroke="#000070" strokeWidth="3" transform="translate(569,216)"/>
            <motion.path animate={controls} d="M0 0 C2 1 2 1 2 1 Z " fill="none" stroke="#000070" strokeWidth="3" transform="translate(355,208)"/>
            <motion.path animate={controls} d="M0 0 C2 1 2 1 2 1 Z " fill="none" stroke="#000070" strokeWidth="3" transform="translate(462,201)"/>
           
        </motion.svg>

    )
}

export default AnimateWorld;