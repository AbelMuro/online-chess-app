import React, {useEffect} from 'react';
import {usePieceLogic} from '~/hooks';
import {useDispatch} from 'react-redux';
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

function Rook({color, row, column}) {
    const [board, currentTurn, handleMouseEnter, handleMouseLeave, handleStyles] = usePieceLogic({color});
    const dispatch = useDispatch();

    const rookMoveRules = () => {
        dispatch({type: 'HIGHLIGHT_NORTH_SQUARES', payload: {square: {row, column, color}}});
        dispatch({type: 'HIGHLIGHT_SOUTH_SQUARES', payload: {square: {row, column, color}}});
        dispatch({type: 'HIGHLIGHT_WEST_SQUARES', payload: {square: {row, column, color}}});
        dispatch({type: 'HIGHLIGHT_EAST_SQUARES', payload: {square: {row, column, color}}});
    }

    const handleClick = () => {
        dispatch({type: 'PIECE_TO_BE_MOVED', payload: {square: {row, column}}});
        rookMoveRules();
    }

    useEffect(() => {
        const squares = [];
        const piece = `rook ${row} ${column}`;

        for(let i = row + 1; i <= 7; i++){                  //forward
            if(board[i][column] === '')
                squares.push({piece, row: i, column});
            else if(board[i][column].includes(color)){
                squares.push({piece, row: i, column});
                break;
            }
            else if(board[i][column].includes(color === 'white' ? 'black king' : 'white king')){
                dispatch({type: `SET_${color === 'white' ? 'BLACK' : 'WHITE'}_KING_IN_CHECK`, payload: {check: true}});
                break;
            }
        }

        for(let i = row - 1; i >= 0; i--){                  //back
            if(board[i][column] === '')
                squares.push({piece, row: i, column});
            else if(board[i][column].includes(color)){
                squares.push({piece, row: i, column});
                break;
            }
            else if(board[i][column].includes(color === 'white' ? 'black king' : 'white king')){
                dispatch({type: `SET_${color === 'white' ? 'BLACK' : 'WHITE'}_KING_IN_CHECK`, payload: {check: true}});
                break;
            }
        }

        for(let i = column - 1; i >= 0; i--){                   //left
            if(board[row][i] === '')
                squares.push({piece, row, column: i});
            else if(board[row][i].includes(color)){
                squares.push({piece, row, column: i});
                break;
            }
            else if(board[row][i].includes(color === 'white' ? 'black king' : 'white king')){
                dispatch({type: `SET_${color === 'white' ? 'BLACK' : 'WHITE'}_KING_IN_CHECK`, payload: {check: true}});
                break;
            }
        }

        for(let i = column + 1; i <= 7; i++){                          //right
            if(board[row][i] === '')
                squares.push({piece, row, column: i});
            else if(board[row][i].includes(color)){
                squares.push({piece, row, column: i});
                break;
            }
            else if(board[row][i].includes(color === 'white' ? 'black king' : 'white king')){
                dispatch({type: `SET_${color === 'white' ? 'BLACK' : 'WHITE'}_KING_IN_CHECK`, payload: {check: true}});
                break;
            }
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
            style={handleStyles()}
            >
            <img className={styles.piece} src={icons[`${color}Rook`]}/>
        </div>
    )
}

export default Rook;