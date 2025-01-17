import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {usePieceLogic} from '~/hooks';
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

//i need to find a way to let the user and the app know when the king is in check
//i also need to prevent any moves that does NOT remove the king from check
//i also need to prevent any moves that will result in the king being in check

function King({color, row, column}) {
    const [board, currentTurn, handleMouseEnter, handleMouseLeave, handleStyles] = usePieceLogic({color});
    const dispatch = useDispatch();
    const illegalMovesForKing = useSelector(state => {
        return color === 'white' ? state.chess.illegal_moves_for_white_king : state.chess.illegal_moves_for_black_king
    });
    const kingInCheck = useSelector(state => {
        return color === 'white' ? state.white_king_in_check : state.black_king_in_check;
    })
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


    const handleCheck = () => {
        return {
            backgroundColor: 'rgba(0, 0, 230, 0.6)'
        }
    }


    const kingMoveRules = () => {
        const blueSquares = [];
        const redSquares = [];

        let legalMoves = legalSquares.filter((square) => {
            const isIllegalSquare = illegalMovesForKing.some(illegalSquare => illegalSquare.row === square.row && illegalSquare.column === square.column)
            return isIllegalSquare ? false : true;
        })

        for(let i = 0; i < legalMoves.length; i++){
            const currRow = legalMoves[i].row;
            const currColumn = legalMoves[i].column;  
            const square = board[currRow]?.[currColumn];

            if(square === '')
                blueSquares.push(legalMoves[i]);
            else if(square && !square.includes(color))
                redSquares.push(legalMoves[i]);
        }
        dispatch({type: `SET_${color === 'white' ? 'BLACK' : 'WHITE'}_KING_IN_CHECK`, payload: {check: false}});
        dispatch({type: 'HIGHLIGHT_BLUE_SQUARES', payload: {squares: blueSquares}});
        dispatch({type: 'HIGHLIGHT_RED_SQUARES', payload: {squares: redSquares}})
    }


    const handleClick = () => {
        dispatch({type: 'PIECE_TO_BE_MOVED', payload: {square: {row, column}}});
        kingMoveRules();
    }


    useEffect(() => {
        const squares = [];
        const piece = `king ${row} ${column}`;

        for(let i = 0; i < legalSquares .length; i++){
            const squareExists = board[legalSquares [i].row]?.[legalSquares [i].column];

            if(squareExists === '')
                squares.push({piece, ...legalSquares[i]});
            else if(squareExists && squareExists.includes(color))
                squares.push({piece, ...legalSquares[i]});
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
            style={kingInCheck ? handleCheck() : handleStyles()}>
                <img className={styles.piece} src={icons[`${color}King`]}/>
        </div>
    )
}

export default King;