import React, {memo, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

function Pawn({color, position}) {
    const row = position.row;
    const column = position.column;
    const initialSquareRef = useRef(color === 'white' ? {row: 1} : {row: 6});
    const currentTurn = useSelector(state => state.chess.current_turn);
    const enPassant = useSelector(state => state.chess.en_passant);
    const board = useSelector(state => state.chess.board);                                                                
    const dispatch = useDispatch();

    const pawnMoveRules = () => {
        const firstSquareInFrontIsAvailable = color === 'white' ? board[row + 1]?.[column] === '' : board[row - 1]?.[column] === '';
        if(!firstSquareInFrontIsAvailable) return;

        const moveTwoSquaresIsAvailable = initialSquareRef.current.row === row;
        const moveOneRow = color === 'white' ? row + 1 : row - 1;        
        const moveTwoRows = color === 'white' ? row + 2 : row - 2;
        const secondSquareInFrontIsAvailable = board[moveTwoRows]?.[column] === '';

        if(moveTwoSquaresIsAvailable){
            if(secondSquareInFrontIsAvailable){
                dispatch({type: 'HIGHLIGHT_BLUE_SQUARES', payload: {squares: [{row: moveOneRow, column: column}, {row: moveTwoRows, column: column}]}});
                dispatch({type: 'SET_ENPASSANT', payload: {squareToMoveInto: {row: moveOneRow, column: column}, pieceToBeTaken: {row: moveTwoRows, column: column}}});
            }        
            else
                dispatch({type: 'HIGHLIGHT_BLUE_SQUARES', payload: {squares: [{row: moveOneRow, column: column}]}});  
        }     
        else
            dispatch({type: 'HIGHLIGHT_BLUE_SQUARES', payload: {squares: [{row: moveOneRow, column: column}]}});
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
        if(enPassant){
            const enPassant_squareToMoveInto = enPassant.squareToMoveInto;
            const enPassant_pieceToBeTaken = enPassant.pieceToBeTaken;
            if(((enPassant_squareToMoveInto.row === leftCorner.row && enPassant_squareToMoveInto.column === leftCorner.column) || (enPassant_squareToMoveInto.row === rightCorner.row && enPassant_squareToMoveInto.column === rightCorner.column))){
                const pieceToTake = board[enPassant_pieceToBeTaken.row]?.[enPassant_pieceToBeTaken.column];
                if((color === 'white' && pieceToTake.includes('black')) || (color === 'black' && pieceToTake.includes('white')))
                    dispatch({type: 'HIGHLIGHT_RED_SQUARES', payload: {squares: [{row: enPassant_squareToMoveInto.row, column: enPassant_squareToMoveInto.column}]}})            
            }
        }
    }

    const handleMove = () => {
        dispatch({type: 'PIECE_TO_BE_MOVED', payload: {square: {row, column}}});
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