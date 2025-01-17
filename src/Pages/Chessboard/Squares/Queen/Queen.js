import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {usePieceLogic} from '~/hooks';
import icons from '~/assets/icons';
import * as styles from './styles.module.css';


//this is where i left off, i will need to find the king in any direction of fire for the queen
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

    const findForkedPieces = (pieces) => {
        for(let i = 0; i < pieces.length; i++){
            const piece = pieces[i][0];
            if(!piece.includes(color) && piece.includes('king')){
                pieces.splice(i, 1);                                    //we remove the king from the range of fire temporarily
                break;
            }
        }

        if(pieces.length === 1)
            dispatch({type: 'SET_FORKED_PIECES', payload: {pieces: [pieces[0][1]]} })
    }


    useEffect(() => {
        const squares = [];
        const pieces = [];
        const piece = `queen ${row} ${column}`

        for(let i = row + 1; i <= 7; i++){                  //forward
            if(board[i][column] === '' || board[i][column].includes(color === 'white' ? 'black king' : 'white king'))
                squares.push({piece, row: i, column});
            else if(board[i][column].includes(color)){
                squares.push({piece, row: i, column});
                break;
            }          
        }

        /* 
            for(let i = row + 1; i <= 7; i++){
                if(board[i][column] !== '' || board[i][column].includes(color === 'white' ? 'black king' : 'white king'))
                    pieces.push([board[i][column], {row: i, column}]);
                else if(board[i][column].includes(color))
                    break;
            }

            findForkedPieces(pieces);        
        
        */


        for(let i = row - 1; i >= 0; i--){                  //back
            if(board[i][column] === '' || board[i][column].includes(color === 'white' ? 'black king' : 'white king'))
                squares.push({piece, row: i, column});
            else if(board[i][column].includes(color)){
                squares.push({piece, row: i, column});
                break;
            } 
            else
                break;
        }

        for(let i = column - 1; i >= 0; i--){                   //left
            if(board[row][i] === '' || board[row][i].includes(color === 'white' ? 'black king' : 'white king'))
                squares.push({piece, row, column: i});
            else if(board[row][i].includes(color)){
                squares.push({piece, row, column: i});
                break;
            } 
            else
                break;
        }

        for(let i = column + 1; i <= 7; i++){                          //right
            if(board[row][i] === '' || board[row][i].includes(color === 'white' ? 'black king' : 'white king'))
                squares.push({piece, row, column: i});
            else if(board[row][i].includes(color)){
                squares.push({piece, row, column: i});
                break;
            } 
            else
                break;
        }

        for(let i = row + 1, j = column - 1; i <= 7 && j >= 0; i++, j--){       //north west diagonal
            if(board[i][j] === '' || board[i][j].includes(color === 'white' ? 'black king' : 'white king'))
                squares.push({piece, row, column: i});
            else if(board[i][j].includes(color)){
                squares.push({piece, row: i, column: j});
                break;
            } 
            else
                break;
        }

        for(let i = row + 1, j = column - 1; i <= 7 && j >= 0; i++, j--){
            if(board[i][j] !== '')
                pieces.push([board[i][j], {row: i, column: j}]);
            else if(board[i][j].includes(color) || board[i][j].includes(color === 'white' ? 'black king' : 'white king')){
                pieces.push([board[i][j], {row: i, column: j}]);
                break
            }
        }

        findForkedPieces(pieces)

        for(let i = row + 1, j = column + 1; i <= 7 && j <= 7; i++, j++){       //north east diagonal
            if(board[i][j] === '' || board[i][j].includes(color === 'white' ? 'black king' : 'white king'))
                squares.push({piece, row, column: i});
            else if(board[i][j].includes(color)){
                squares.push({piece, row: i, column: j});
                break;
            } 
            else
                break;
        }

        for(let i = row - 1, j = column - 1; i >= 0 && j >= 0; i--, j--){       //south west diagonal
            if(board[i][j] === '' || board[i][j].includes(color === 'white' ? 'black king' : 'white king'))
                squares.push({piece, row, column: i});
            else if(board[i][j].includes(color)){
                squares.push({piece, row: i, column: j});
                break;
            } 
            else
                break;
        }

        for(let i = row - 1, j = column + 1; i >= 0 && j <= 7; i--, j++){       //south east diagonal
            if(board[i][j] === '' || board[i][j].includes(color === 'white' ? 'black king' : 'white king'))
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
    }, [])
    
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