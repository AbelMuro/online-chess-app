import React, {useEffect, memo, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as styles from './styles.module.css';

function Timer() {
    const seconds = useSelector(state => state.timer.seconds);
    const currentTurn = useSelector(state => state.chess.current_turn);
    const userColor = useSelector(state => state.settings.user_color)
    const timerRef = useRef();
    const dispatch = useDispatch();

    const displayTimer = () => {
        const sec = Math.floor(seconds % 60);
        const min = Math.floor(seconds / 60);
        const formattedSec = sec === 0 ? '00' : sec < 10 ? `0${sec}` : sec;
        if(sec === 0 && min === 0){
            clearInterval(timerRef.current);
            dispatch({type: 'RESET_TIMER', payload: {seconds: 60}});
        }
            
        return `${min}:${formattedSec}`;
    }

    useEffect(() => {
        if(currentTurn !== userColor) return;

        timerRef.current = setInterval(() => {
            dispatch({type: 'UPDATE_TIMER'});
        }, 1000)

        return () => {
            clearInterval(timerRef.current);
        }
    }, [currentTurn, userColor])

    return(
        <div className={styles.timer}>
            {displayTimer()}
        </div>
    )
}

export default memo(Timer);