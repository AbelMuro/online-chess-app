import React, {useEffect} from 'react';
import {usePieceLogic} from '~/hooks';
import {useDispatch} from 'react-redux';
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

function Rook({color, row, column}) {
    const [board, currentTurn, handleMouseEnter, handleMouseLeave, handleStyles] = usePieceLogic({color});
    const dispatch = useDispatch();

    const rookMoveRules = () => {
        const blueSquares = [];
        const redSquares = [];

        for(let i = row + 1; i <= 7; i++){                  //forward
            if(board[i][column] === '')
                blueSquares.push({row: i, column});
            else if(!board[i][column].includes(color)){
                redSquares.push({row: i, column});
                break;
            }
            else
                break;    
        }

        for(let i = row - 1; i >= 0; i--){                      //back
            if(board[i][column] === '')
                blueSquares.push({row: i, column});
            else if(!board[i][column].includes(color)){
                redSquares.push({row: i, column});
                break;
            }
            else
                break;
        }

        for(let i = column - 1; i >= 0; i--){                   //left
            if(board[row][i] === '')
                blueSquares.push({row, column: i});
            else if(!board[row][i].includes(color)){
                redSquares.push({row, column: i});
                break;
            }
            else
                break;
        }

        for(let i = column + 1; i <= 7; i++){                          //right
            if(board[row][i] === '')
                blueSquares.push({row, column: i});
            else if(!board[row][i].includes(color)){
                redSquares.push({row, column: i});
                break;
            }
            else
                break;
            
        }
        dispatch({type: 'HIGHLIGHT_BLUE_SQUARES', payload: {squares: blueSquares}});
        dispatch({type: 'HIGHLIGHT_RED_SQUARES', payload: {squares: redSquares}});
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
            else{
                squares.push({piece, row: i, column});
                break;
            }
        }

        for(let i = row - 1; i >= 0; i--){                  //back
            if(board[i][column] === '')
                squares.push({piece, row: i, column});
            else{
                squares.push({piece, row: i, column});
                break;
            }
        }

        for(let i = column - 1; i >= 0; i--){                   //left
            if(board[row][i] === '')
                squares.push({piece, row, column: i});
            else{
                squares.push({piece, row, column: i});
                break;
            }
        }

        for(let i = column + 1; i <= 7; i++){                          //right
            if(board[row][i] === '')
                squares.push({piece, row, column: i});
            else{
                squares.push({piece, row, column: i});
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