import React from 'react';
import Circle from './Circle';
import * as styles from './styles.module.css';

function CircleDesign() {
    return(
        <svg
            className={styles.container}
            viewBox="0 0 297 210"
            version="1.1"
            preserveAspectRatio='xMinYMin none'
            xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id='blurCircle'>
                    <feGaussianBlur stdDeviation={3}/>
                </filter>
            </defs>
            <g id="layer1" transform='translate(-130, 60), scale(2)'>
                <Circle
                    duration={4.5}
                    from={0}
                    to={360}
                    fill='none'
                    stroke='blue'
                    strokeWidth='2'
                    strokeLinecap='butt'
                    strokeMiterlimit='0'
                    strokeDasharray='5.151, 5.151'
                    strokeDashoffset='0'
                    strokeOpacity='1'
                    cx="140.5276"
                    cy="106.69689"
                    r="80" />
                <Circle
                    duration={7.5}
                    from={360}
                    to={0}
                    fill='none'
                    stroke='blue'
                    strokeWidth='2'
                    strokeLinecap='butt'
                    strokeMiterlimit='0'
                    strokeDasharray='1.717, 3.434'
                    strokeDashoffset='0'
                    strokeOpacity='1'
                    cx="173.47697"
                    cy="-29.255779"
                    r="68.79892"
                    transform="rotate(46.759923)" />
                <Circle
                    duration={2.5}
                    from={0}
                    to={360}
                    fill='none'
                    stroke='blue'
                    strokeWidth='2'
                    strokeLinecap='butt'
                    strokeMiterlimit='0'
                    strokeDasharray='11.2463, 1.40579'
                    strokeDashoffset='0'
                    strokeOpacity='1'           
                    cx="148.3203"
                    cy="-94.144333"
                    r="56.329224"
                    transform="rotate(69.551151)" />
                <Circle
                    duration={10}
                    from={260}
                    to={0}
                    fill='none'
                    stroke='blue'
                    strokeWidth='2'
                    strokeLinecap='butt'
                    strokeMiterlimit='0'
                    strokeDasharray='1.93406, 0.96703'
                    strokeDashoffset='0'
                    strokeOpacity='1'
                    cx="173.54935"
                    cy="27.138885"
                    r="38.748379"
                    transform="rotate(28.172173)" />
            </g>
        </svg>
    )
}

export default CircleDesign;