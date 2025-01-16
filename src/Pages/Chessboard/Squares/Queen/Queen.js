import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {usePieceLogic} from '~/hooks';
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

function Queen({color, row, column}) {
    const [board, currentTurn, handleMouseEnter, handleMouseLeave, handleStyles] = usePieceLogic({color});
    const dispatch = useDispatch();

    const createSquares = (blueSquares, redSquares, row, column) => {
        if(board[row][column] === ''){
            blueSquares.push({row, column});
            return true;
        }
        else if(!board[row][column].includes(color)){
            redSquares.push({row, column});
            return false;
        }
        else
            return false;
    }

    const queenMoveRules = () => {
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

        for(let i = row - 1; i >= 0; i--){                  //back
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

        for(let i = row + 1, j = column - 1; i <= 7 && j >= 0; i++, j--){       //north west diagonal
            if(!createSquares(blueSquares, redSquares, i, j))
                break;
        }

        for(let i = row + 1, j = column + 1; i <= 7 && j <= 7; i++, j++){       //north east diagonal
            if(!createSquares(blueSquares, redSquares, i, j))
                break;
        }

        for(let i = row - 1, j = column - 1; i >= 0 && j >= 0; i--, j--){       //south west diagonal
            if(!createSquares(blueSquares, redSquares, i, j))
                break;
        }

        for(let i = row - 1, j = column + 1; i >= 0 && j <= 7; i--, j++){       //south east diagonal
            if(!createSquares(blueSquares, redSquares, i, j))
                break;
        }
        dispatch({type: 'HIGHLIGHT_BLUE_SQUARES', payload: {squares: blueSquares}});
        dispatch({type: 'HIGHLIGHT_RED_SQUARES', payload: {squares: redSquares}});
    }

    const handleClick = () => {
        dispatch({type: 'PIECE_TO_BE_MOVED', payload: {square: {row, column}}})
        queenMoveRules();
    }



    useEffect(() => {
        const squares = [];
        const piece = `queen ${row} ${column}`

        for(let i = row + 1; i <= 7; i++){                  //forward
            if(board[i][column] === '')
                squares.push({piece, row: i, column});
            else if(board[i][column].includes(color)){
                squares.push({piece, row: i, column});
                break;
            } 
            else
                break;
        }

        for(let i = row - 1; i >= 0; i--){                  //back
            if(board[i][column] === '')
                squares.push({piece, row: i, column});
            else if(board[i][column].includes(color)){
                squares.push({piece, row: i, column});
                break;
            } 
            else
                break;
        }

        for(let i = column - 1; i >= 0; i--){                   //left
            if(board[row][i] === '')
                squares.push({piece, row, column: i});
            else if(board[row][i].includes(color)){
                squares.push({piece, row, column: i});
                break;
            } 
            else
                break;
        }

        for(let i = column + 1; i <= 7; i++){                          //right
            if(board[row][i] === '')
                squares.push({piece, row, column: i});
            else if(board[row][i].includes(color)){
                squares.push({piece, row, column: i});
                break;
            } 
            else
                break;
        }

        for(let i = row + 1, j = column - 1; i <= 7 && j >= 0; i++, j--){       //north west diagonal
            if(board[i][j] === '')
                squares.push({piece, row, column: i});
            else if(board[i][j].includes(color)){
                squares.push({piece, row: i, column: j});
                break;
            } 
            else
                break;
        }

        for(let i = row + 1, j = column + 1; i <= 7 && j <= 7; i++, j++){       //north east diagonal
            if(board[i][j] === '')
                squares.push({piece, row, column: i});
            else if(board[i][j].includes(color)){
                squares.push({piece, row: i, column: j});
                break;
            } 
            else
                break;
        }

        for(let i = row - 1, j = column - 1; i >= 0 && j >= 0; i--, j--){       //south west diagonal
            if(board[i][j] === '')
                squares.push({piece, row, column: i});
            else if(board[i][j].includes(color)){
                squares.push({piece, row: i, column: j});
                break;
            } 
            else
                break;
        }

        for(let i = row - 1, j = column + 1; i >= 0 && j <= 7; i--, j++){       //south east diagonal
            if(board[i][j] === '')
                squares.push({piece, row, column: i});
            else if(board[i][j].includes(color)){
                squares.push({piece, row: i, column: j});
                break;
            } 
            else
                break;
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
    })
    
    return (
        <div             
            className={styles.container} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
            onClick={currentTurn === color ? handleClick : () => {}}
            style={handleStyles()}>
                <img className={styles.piece} src={icons[`${color}Queen`]}/>
        </div>
    )
}

export default Queen;