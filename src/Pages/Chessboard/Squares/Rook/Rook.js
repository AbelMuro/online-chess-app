import React from 'react';
import {useMouseOver} from '~/hooks';
import {useSelector, useDispatch} from 'react-redux';
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

function Rook({color, position}) {
    const row = position.row;
    const column = position.column;
    const board = useSelector(state => state.chess.board);
    const currentTurn = useSelector(state => state.chess.current_turn);
    const [handleMouseEnter, handleMouseLeave, handleStyles] = useMouseOver({color});
    const dispatch = useDispatch();

    const rookMoveRules = () => {
        const blueSquares = [];
        const redSquares = [];

        for(let i = row + 1; i <= 7; i++){                  //forward
            if(board[i][column] === '')
                blueSquares.push({row: i, column});
            else if(color === 'white' && board[i][column].includes('black')){
                redSquares.push({row: i, column});
                break;
            }
            else if(color === 'black' && board[i][column].includes('white')){
                redSquares.push({row: i, column});
                break;
            }
            else
                break;    
        }

        for(let i = row - 1; i >= 0; i--){                  //back
            if(board[i][column] === '')
                blueSquares.push({row: i, column});
            else if(color === 'white' && board[i][column].includes('black')){
                redSquares.push({row: i, column});
                break;
            }
            else if(color === 'black' && board[i][column].includes('white')){
                redSquares.push({row: i, column});
                break;
            }
            else
                break;
        }

        for(let i = column - 1; i >= 0; i--){                   //left
            if(board[row][i] === '')
                blueSquares.push({row, column: i});
            else if(color === 'white' && board[row][i].includes('black')){
                redSquares.push({row, column: i});
                break;
            }
            else if(color === 'black' && board[row][i].includes('white')){
                redSquares.push({row, column: i});
                break;
            }
            else
                break;
        }

        for(let i = column + 1; i <= 7; i++){                          //right
            if(board[row][i] === '')
                blueSquares.push({row, column: i});
            else if(color === 'white' && board[row][i].includes('black')){
                redSquares.push({row, column: i});
                break;
            }
            else if(color === 'black' && board[row][i].includes('white')){
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