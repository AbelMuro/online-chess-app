import React, {memo, useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useMouseOver} from '~/hooks';
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

// i need to find a way to let the redux store know if a pawn has moved two squares forward, thereby enabling en passant

function Pawn({color, row, column}) {

    const initialSquareRef = useRef(color === 'white' ? {row: 1} : {row: 6});
    const currentTurn = useSelector(state => state.chess.current_turn);
    const enPassant = useSelector(state => state.chess.en_passant);
    const [handleMouseEnter, handleMouseLeave, handleStyles] = useMouseOver({color});
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

        if(leftCornerSquare && !leftCornerSquare.includes(color))
            dispatch({type: 'HIGHLIGHT_RED_SQUARES', payload: {squares: [{row: leftCorner.row, column: leftCorner.column}]}})
        
        if(rightCornerSquare && !rightCornerSquare.includes(color))
            dispatch({type: 'HIGHLIGHT_RED_SQUARES', payload: {squares: [{row: rightCorner.row, column: rightCorner.column}]}})
        
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

    useEffect(() => {
        const piece = `pawn ${row} ${column}`;
        const leftCorner = color === 'white' ? {piece, row: row + 1, column: column - 1} : {piece, row: row - 1, column: column - 1};
        const rightCorner = color === 'white' ? {piece, row: row + 1, column: column + 1} : {piece, row: row - 1, column: column + 1};

        const squares = [];
        const leftCornerExists = board[leftCorner.row]?.[leftCorner.column];
        const rightCornerExists = board[rightCorner.row]?.[rightCorner.column];

        if(leftCornerExists && leftCornerExists.includes(color))
            squares.push(leftCorner);
        else if(leftCornerExists === '')
            squares.push(leftCorner);
        else if(leftCornerExists && leftCornerExists.includes(color === 'white' ? 'black king' : 'white king'))
            squares.push(leftCorner);

        if(rightCornerExists && rightCornerExists.includes(color))
            squares.push(rightCorner);
        else if(rightCornerExists === '')
            squares.push(rightCorner);
        else if(rightCornerExists && rightCornerExists.includes(color === 'white' ? 'black king' : 'white king'))
            squares.push(rightCorner);

        if(color === 'white')
            dispatch({type: 'SET_ILLEGAL_MOVES_FOR_BLACK_KING', payload: {squares: squares}}) 
        else
            dispatch({type: 'SET_ILLEGAL_MOVES_FOR_WHITE_KING', payload: {squares: squares}}) 

        return () => {
            if(color === 'white')
                dispatch({type: 'CLEAR_ILLEGAL_MOVES_FOR_BLACK_KING', payload: {piece} });
            else
                dispatch({type: 'CLEAR_ILLEGAL_MOVES_FOR_WHITE_KING', payload: {piece}})
        }
            
    }, [])


    return(
        <div 
            className={styles.container} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
            onClick={currentTurn === color ? handleMove : () => {}}
            style={handleStyles()}
            >
            <img className={styles.piece} src={icons[`${color}Pawn`]}/>  
        </div> 
    )
}

export default memo(Pawn);