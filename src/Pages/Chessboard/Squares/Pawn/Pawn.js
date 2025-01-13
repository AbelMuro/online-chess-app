import React, {memo, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

function Pawn({color, position}) {
    const row = position.row;
    const column = position.column;
    const initialSquareRef = useRef(color === 'white' ? {row: 1} : {row: 6});
    const currentTurn = useSelector(state => state.chess.current_turn);
    const enPassant = useSelector(state => state.chess.en_passant)
    const board = useSelector(state => state.chess.board);                                                                
    const dispatch = useDispatch();


    const pawnMoveRules = () => {
        const firstSquareInFrontIsAvailable = color === 'white' ? board[row + 1]?.[column] === '' : board[row - 1]?.[column] === '';
        if(!firstSquareInFrontIsAvailable) return;

        dispatch({type: 'PIECE_TO_BE_MOVED', payload: {square: {row, column}}});

        const moveTwoSquaresIsAvailable = initialSquareRef.current.row === row;
        const moveOneRow = color === 'white' ? row + 1 : row - 1;        
        const moveTwoRows = color === 'white' ? row + 2 : row - 2;
        const secondSquareInFrontIsAvailable = board[moveTwoRows]?.[column] === '';

        if(moveTwoSquaresIsAvailable){
            if(secondSquareInFrontIsAvailable)
                dispatch({type: 'HIGHLIGHT_BLUE_SQUARES', payload: {squares: [{row, column}, {row: moveOneRow, column: column, enpassant: true}, {row: moveTwoRows, column: column}]}});        //this will set a square for en passant
            else
                dispatch({type: 'HIGHLIGHT_BLUE_SQUARES', payload: {squares: [{row, column}, {row: moveOneRow, column: column}]}});  
        }     
        else
            dispatch({type: 'HIGHLIGHT_BLUE_SQUARES', payload: {squares: [{row, column}, {row: moveOneRow, column: column}]}});
    }

    const pawnTakeRules = () =>{
        const leftCorner = color === 'white' ? {row: row + 1, column: column - 1} : {row: row - 1, column: column - 1};
        const rightCorner = color === 'white' ? {row: row + 1, column: column + 1} : {row: row - 1, column: column + 1};
        const leftCornerSquare = board[leftCorner.row]?.[leftCorner.column];
        const rightCornerSquare = board[rightCorner.row]?.[rightCorner.column];

        if(leftCornerSquare){
            if((color === 'white' && leftCornerSquare.includes('black')) || (color === 'black' && leftCornerSquare.includes('white')))
                dispatch({type: 'HIGHLIGHT_RED_SQUARES', payload: {squares: [{row: leftCorner.row, column: leftCorner.column}]}})
        }
        if(rightCornerSquare){
            if((color === 'white' && rightCornerSquare.includes('black')) || (color === 'black' && rightCornerSquare.includes('white')))
                dispatch({type: 'HIGHLIGHT_RED_SQUARES', payload: {squares: [{row: rightCorner.row, column: rightCorner.column}]}})
        }
        if(enPassant && ((enPassant.row === leftCorner.row && enPassant.column === leftCorner.column) || (enPassant.row === rightCorner.row && enPassant.column === rightCorner.column))){
            const moveOneRow = color === 'white' ? enPassant.row - 1 : enPassant.row + 1;
            const pieceToTake = board[moveOneRow]?.[enPassant.column];
            if((color === 'white' && pieceToTake.includes('black')) || (color === 'black' && pieceToTake.includes('white')))
                dispatch({type: 'HIGHLIGHT_RED_SQUARES', payload: {squares: [{row: enPassant.row, column: enPassant.column}]}})            
        }
    }

    const handleMove = () => {
        pawnMoveRules();  
        pawnTakeRules();     
    }

    return(
        <div className={styles.container} onClick={currentTurn === color ? handleMove : () => {}}>
            <img className={styles.piece} src={icons[`${color}Pawn`]}/>  
        </div> 
    )
}

export default memo(Pawn);