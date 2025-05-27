import React from 'react';
import Path from './Path';
import {motion, useScroll} from 'framer-motion';
import * as styles from './styles.module.css';

/* 
    -This is where i left off, i need to apply the following glow effect on the other
    svg elements (and get a brighter color too)

            <defs>
                <filter id="glowEffect">
                    <feGaussianBlur stdDeviation="2" result="blur1"/>
                    <feGaussianBlur in="blur1" stdDeviation="5" result="blur2"/>
                    <feMerge>
                        <feMergeNode in="blur2"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs> 

    -then i will convert the container png file into a reliable SVG file

    -also, update notes on SVG filters, specifically on the following svg tags

            <feDisplacementMap>

            <feBlend>

            <feMerge>
                <feMergeNode in="blur2"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>

            the 'result' property and the 'in' property

*/


function AnimateEnd() {
    const {scrollYPosition} = useScroll();


    return(
        <svg
            className={styles.container}
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 200 200"
            version="1.1"
            id="svg1"
            xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="glowEffect">
                    <feGaussianBlur stdDeviation="2" result="blur1"/>
                    <feGaussianBlur in="blur1" stdDeviation="5" result="blur2"/>
                    <feMerge>
                        <feMergeNode in="blur2"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs> 

            <g id="layer1" transform="translate(-44.2507218,-2.0818906)">
                <Path d="M 68.448228,21.632853 34.695048,50.039643 9.4269806,71.305333"  />
                <Path d="m 225.53701,20.58468 33.75318,28.406786 25.26807,21.26569"  />
                <Path d="m 109.63396,141.06485 0.41953,-1.62019 1.5804,-2.30413 1.979,-1.39384"  transform="rotate(35.304287,275.72284,15.994317)" />
                <Path d="M 74.882239,43.872292 223.38387,43.40457"  transform="translate(-1.2777475,-23.849901)" />
                <Path d="m 109.63396,141.06485 0.41953,-1.62019 1.5804,-2.30413 1.979,-1.39384"  transform="matrix(-0.81609435,0.57791869,0.57791869,0.81609435,234.70409,-156.88922)" />
                <Path d="m 50.139763,100.27952 0.187087,63.61015"  transform="translate(-41.655197,-24.845166)" />
                <Path d="m 109.63396,141.06485 0.41953,-1.62019 1.5804,-2.30413 1.979,-1.39384" transform="matrix(0.56879718,0.82247782,0.82247782,-0.56879718,-167.82497,60.118534)" />
                <Path
                
                d="m 109.63396,141.06485 0.41953,-1.62019 1.5804,-2.30413 1.979,-1.39384"
                id="path428-61"
                transform="rotate(-55.050092,62.439976,237.12068)" /><Path
                
                d="m 109.63396,141.06485 0.41953,-1.62019 1.5804,-2.30413 1.979,-1.39384"
                id="path428-6-1"
                transform="rotate(123.06215,216.13386,152.55647)" /><Path
                
                d="m 50.139763,100.27952 0.187087,63.61015"
                id="path430-7"
                transform="translate(235.98041,-26.905681)" /><Path
                
                d="m 109.63396,141.06485 0.41953,-1.62019 1.5804,-2.30413 1.979,-1.39384"
                id="path428-61-3"
                transform="matrix(-0.57791869,-0.81609435,-0.81609435,0.57791869,462.73614,149.89529)" /><Path
                
                d="m 284.42255,141.95539 -33.75318,28.40678 -25.26807,21.26569"
                id="path426-0" /><Path
                
                d="m 10.417376,143.14827 33.75318,28.4068 25.26807,21.26569" /><Path
                
                d="M 74.882239,43.872292 223.38387,43.40457"
                transform="translate(-2.8112378,149.63382)" /><Path
                
                d="m 109.63396,141.06485 0.41953,-1.62019 1.5804,-2.30413 1.979,-1.39384"
                transform="rotate(-104.37333,111.79424,181.42421)" /><Path
                
                d="m 109.63396,141.06485 0.41953,-1.62019 1.5804,-2.30413 1.979,-1.39384"
                transform="matrix(0.28300787,-0.95911759,-0.95911759,-0.28300787,324.50818,338.09808)" />
            </g>
        </svg>
    )
}

export default AnimateEnd;