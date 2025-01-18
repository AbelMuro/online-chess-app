import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {usePieceLogic} from '~/hooks';
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

function Knight({color, row, column}) {
    const [board, currentTurn, handleMouseEnter, handleMouseLeave, handleStyles] = usePieceLogic({color});
    const dispatch = useDispatch();
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

    const knightMoveRules = () => {
        dispatch({type: 'HIGHLIGHT_KNIGHT_SQUARES', payload: {square: {row, column, color}}})
        
    }

    const handleClick = () => {
        dispatch({type: 'PIECE_TO_BE_MOVED', payload: {square: {row, column}}});
        knightMoveRules();
    }

    useEffect(() => {
        const squares = [];
        const piece = `knight ${row} ${column}`;

        for(let i = 0; i < legalSquares.length; i++){
            const square = board[legalSquares[i].row]?.[legalSquares[i].column];

            if(square === '')
                squares.push({piece, ...legalSquares[i]})
            else if(square && square.includes(color))
                squares.push({piece, ...legalSquares[i]})
            else if(square && square.includes(color === 'white' ? 'black king' : 'white king'))
                squares.push({piece, ...legalSquares[i]})
        }
        if(color === 'white')
            dispatch({type: 'SET_ILLEGAL_MOVES_FOR_BLACK_KING', payload: {squares: squares}}) 
        else
            dispatch({type: 'SET_ILLEGAL_MOVES_FOR_WHITE_KING', payload: {squares: squares}}) 

        return () => {
            if(color === 'white')
                dispatch({type: 'CLEAR_ILLEGAL_MOVES_FOR_BLACK_KING', payload: {piece}}) 
            else
                dispatch({type: 'CLEAR_ILLEGAL_MOVES_FOR_WHITE_KING', payload: {piece}}) 
        }
    }, [])

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