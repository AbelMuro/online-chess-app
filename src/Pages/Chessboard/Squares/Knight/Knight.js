import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {usePieceLogic} from '~/hooks';
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

function Knight({color, row, column}) {
    const [board, currentTurn, handleMouseEnter, handleMouseLeave, handleStyles] = usePieceLogic({color});
    const dispatch = useDispatch();

    const knightMoveRules = () => {
        dispatch({type: 'HIGHLIGHT_KNIGHT_SQUARES', payload: {square: {row, column, color}}})
        
    }

    const handleClick = () => {
        dispatch({type: 'PIECE_TO_BE_MOVED', payload: {square: {row, column}}});
        dispatch({type: 'REMOVE_ALL_HIGHLIGHTED_SQUARES'});
        knightMoveRules();
    }

    return (
        <div             
            className={styles.container} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
            onClick={currentTurn === color ? handleClick : () => {}}
            style={handleStyles()}>
            <img className={styles.piece} src={icons[`${color}Knight`]}/>
        </div>
    )
}

export default Knight;