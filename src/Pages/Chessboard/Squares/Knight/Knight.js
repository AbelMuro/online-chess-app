import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useMouseOver} from '~/hooks';
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

function Knight({color, position}) {
    const row = position.row;
    const column = position.column;
    const board = useSelector(state => state.chess.board);
    const currentTurn = useSelector(state => state.chess.current_turn);
    const [handleMouseEnter, handleMouseLeave, handleStyles] = useMouseOver({color});
    const dispatch = useDispatch();

    const knightMoveRules = () => {
        const legalSquares = [
            {row: row + 2, column: column - 1}, 
            {row: row + 2, column : column + 1},
            {row: row - 1, column: column + 2}, 
            {row: row + 1, column: column + 2},
            {row: row - 2, column: column + 1},
            {row: row - 2, column: column - 1},
            {row: row + 1, column: column - 2},
            {row: row - 1, column: column - 2}
        ];
        const redSquares = [];
        const blueSquares = [];

        legalSquares.forEach((square) => {
            if(board[square.row]?.[square.column] === '')
                blueSquares.push(square);
            else if(board[square.row]?.[square.column] && !board[square.row]?.[square.column].includes(color))
                redSquares.push(square);
        })

        dispatch({type: 'HIGHLIGHT_BLUE_SQUARES', payload: {squares: blueSquares}});
        dispatch({type: 'HIGHLIGHT_RED_SQUARES', payload: {squares: redSquares}});
        
    }

    const handleClick = () => {
        dispatch({type: 'PIECE_TO_BE_MOVED', payload: {square: {row, column}}});
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