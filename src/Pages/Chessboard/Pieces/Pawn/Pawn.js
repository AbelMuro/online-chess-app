import React, {useRef, memo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

function Pawn({color, position}) {
    const row = position.row;
    const column = position.column;
    const board = useSelector(state => state.chess.board);
    const dispatch = useDispatch();
    const twoSquareMove = useRef(true);

    const handleMove = () => {

        if(color === 'white'){
            const oneSquareUp = board[row + 1][column];
            const twoSquareUp = board[row + 2][column];
            dispatch({type: 'PIECE_TO_BE_MOVED', payload: {square: {row, column}}})
            dispatch({type: 'HIGHLIGHT_SQUARES', payload: {squares: [{row: row + 1, column: column}, {row: row + 2, column: column}]}})
        }
        else{
            dispatch({type: 'PIECE_TO_BE_MOVED', payload: {square: {row, column}}})
            dispatch({type: 'HIGHLIGHT_SQUARES', payload: {squares: [{row: row - 1, column: column}, {row: row - 2, column: column}]}})
        }

    }

    return(
        <div className={styles.container} onClick={handleMove}>
            <img className={styles.piece} src={icons[`${color}Pawn`]}/>  
        </div> 
    )
}

export default memo(Pawn);