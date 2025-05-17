import React, {useState, useEffect, memo, useRef} from 'react';
import * as styles from './styles.module.css';

function Timer() {
    const [seconds, setSeconds] = useState(60);
    const timerRef = useRef();

    const displayTimer = () => {
        const sec = Math.floor(seconds % 60);
        const min = Math.floor(seconds / 60);
        const formattedSec = sec === 0 ? '00' : sec < 10 ? `0${sec}` : sec;
        if(sec === 0 && min === 0)
            clearInterval(timerRef.current);

        return `${min}:${formattedSec}`
    }

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setSeconds((seconds) => {
                return seconds - 1;
            })
        }, 1000)

        return () => {
            clearInterval(timerRef.current);
        }

    }, [])

    return(
        <div className={styles.timer}>
            {displayTimer()}
        </div>
    )
}

export default memo(Timer);