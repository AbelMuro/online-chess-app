import React from 'react';
import {useDispatch} from 'react-redux';
import {usePieceLogic} from '~/hooks';
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

//this is where i left off, i will need to check the array for the illegalMoves for the king
//the king can only move to a square that is NOT in the illegalMoves array

function King({color, row, column}) {
    const [board, currentTurn, handleMouseEnter, handleMouseLeave, handleStyles] = usePieceLogic({color});
    const dispatch = useDispatch();

    const kingMoveRules = () => {
        const legalSquares = [ 
            {row: row + 1, column}, 
            {row: row - 1, column}, 
            {row, column: column - 1}, 
            {row, column: column + 1},
            {row: row + 1, column: column - 1},
            {row: row + 1, column: column + 1},
            {row: row - 1, column: column - 1},
            {row: row - 1, column: column + 1}
        ];
        const blueSquares = [];
        const redSquares = [];


        for(let i = 0; i < legalSquares.length; i++){
            const currRow = legalSquares[i].row;
            const currColumn = legalSquares[i].column;

            if(board[currRow]?.[currColumn] === '')
                blueSquares.push(legalSquares[i]);
            else if(board[currRow] && board[currRow][currColumn] && !board[currRow][currColumn].includes(color))
                redSquares.push(legalSquares[i]);
        }

        dispatch({type: 'HIGHLIGHT_BLUE_SQUARES', payload: {squares: blueSquares}});
        dispatch({type: 'HIGHLIGHT_RED_SQUARES', payload: {squares: redSquares}})
    }


    const handleClick = () => {
        dispatch({type: 'PIECE_TO_BE_MOVED', payload: {square: {row, column}}});
        kingMoveRules();
    }

    return (
        <div             
            className={styles.container} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
            onClick={currentTurn === color ? handleClick : () => {}}
            style={handleStyles()}>
                <img className={styles.piece} src={icons[`${color}King`]}/>
        </div>
    )
}

export default King;