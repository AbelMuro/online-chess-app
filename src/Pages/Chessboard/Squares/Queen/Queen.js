import React, {useEffect, memo} from 'react';
import {useDispatch} from 'react-redux';
import {usePieceLogic} from '~/hooks';
import icons from '~/assets/icons';
import * as styles from './styles.module.css';


//this is where i left off, i will need to find the king in any direction of fire for the queen
function Queen({color, row, column}) {
    const [board, currentTurn, handleMouseEnter, handleMouseLeave, handleStyles] = usePieceLogic({color});
    const dispatch = useDispatch();


    const queenMoveRules = () => {
        dispatch({type: 'HIGHLIGHT_NORTH_SQUARES', payload: {square: {row, column, color}}});
        dispatch({type: 'HIGHLIGHT_SOUTH_SQUARES', payload: {square: {row, column, color}}});
        dispatch({type: 'HIGHLIGHT_WEST_SQUARES', payload: {square: {row, column, color}}});
        dispatch({type: 'HIGHLIGHT_EAST_SQUARES', payload: {square: {row, column, color}}});
        dispatch({type: 'HIGHLIGHT_NORTHWEST_SQUARES', payload: {square: {row, column, color}}});
        dispatch({type: 'HIGHLIGHT_NORTHEAST_SQUARES', payload: {square: {row, column, color}}});
        dispatch({type: 'HIGHLIGHT_SOUTHWEST_SQUARES', payload: {square: {row, column, color}}});
        dispatch({type: 'HIGHLIGHT_SOUTHEAST_SQUARES', payload: {square: {row, column, color}}});

    }

    const handleClick = () => {
        dispatch({type: 'PIECE_TO_BE_MOVED', payload: {square: {row, column}}})
        queenMoveRules();
    }

    const findForkedPieces = (pieces) => {
        if(pieces.length === 1)
            dispatch({type: 'SET_FORKED_PIECES', payload: {pieces: [pieces[0][1]]} })
    }


    useEffect(() => {
        const squares = [];
        let pieces = [];
        const piece = `queen ${row} ${column}`;
        let kingExists = false;

        for(let i = row + 1; i <= 7; i++){                  //forward
            if(board[i][column] === '' || board[i][column].includes(color === 'white' ? 'black king' : 'white king'))
                squares.push({piece, row: i, column});
            else if(board[i][column].includes(color)){
                squares.push({piece, row: i, column});
                break;
            }          
        }

        for(let i = row + 1; i <= 7; i++){                  //forward
            if(board[i][column].includes(color === 'white' ? 'black king' : 'white king')){
                kingExists = true;
                break;
            }
            else if(board[i][column] === '')
                continue;
            else if(board[i][column].includes(color))
                break;
            else if(!board[i][column].includes(color))
                pieces.push([board[i][column], {row: i, column}]);
        }

        if(kingExists)
            findForkedPieces(pieces)

        kingExists = false;
        pieces = [];


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

        for(let i = row - 1; i >= 0; i--){                  //back
            if(board[i][column].includes(color === 'white' ? 'black king' : 'white king')){
                kingExists = true;
                break;
            }
            else if(board[i][column] === '')
                continue;
            else if(board[i][column].includes(color))
                break;
            else if(!board[i][column].includes(color))
                pieces.push([board[i][column], {row: i, column}]);
        }

        console.log('use effect')

        if(kingExists)
            findForkedPieces(pieces)

        kingExists = false;
        pieces = [];

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

        for(let i = column - 1; i >= 0; i--){                   //left
            if(board[row][i].includes(color === 'white' ? 'black king' : 'white king')){
                kingExists = true;
                break;
            }
            else if(board[row][i] === '')
                continue;
            else if(board[row][i].includes(color))
                break;
            else if(!board[row][i].includes(color))
                pieces.push([board[i][column], {row, column: i}]);
        }

        if(kingExists)
            findForkedPieces(pieces)

        kingExists = false;
        pieces = [];


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

        for(let i = column + 1; i <= 7; i++){                           //right
            if(board[row][i].includes(color === 'white' ? 'black king' : 'white king')){
                kingExists = true;
                break;
            }
            else if(board[row][i] === '')
                continue;
            else if(board[row][i].includes(color))
                break;
            else if(!board[row][i].includes(color))
                pieces.push([board[i][column], {row, column: i}]);
        }

        if(kingExists)
            findForkedPieces(pieces)

        kingExists = false;
        pieces = [];


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

        for(let i = row + 1, j = column - 1; i <= 7 && j >= 0; i++, j--){           //north west diagonal
            if(board[i][j].includes(color === 'white' ? 'black king' : 'white king')){
                kingExists = true;
                break;
            }
            else if(board[i][j] === '')
                continue;
            else if(board[i][j].includes(color))
                break;
            else if(!board[i][j].includes(color))
                pieces.push([board[i][j], {row: i, column: j}]);
            
        }

        if(kingExists)
            findForkedPieces(pieces)

        kingExists = false;
        pieces = [];

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


        for(let i = row + 1, j = column + 1; i <= 7 && j <= 7; i++, j++){           //north east diagonal
            if(board[i][j].includes(color === 'white' ? 'black king' : 'white king')){
                kingExists = true;
                break;
            }
            else if(board[i][j] === '')
                continue;
            else if(board[i][j].includes(color))
                break;
            else if(!board[i][j].includes(color))
                pieces.push([board[i][j], {row: i, column: j}]);
        }


        if(kingExists)
            findForkedPieces(pieces)

        kingExists = false;
        pieces = [];

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

        for(let i = row - 1, j = column - 1; i >= 0 && j >= 0; i--, j--){           //south west diagonal
            if(board[i][j].includes(color === 'white' ? 'black king' : 'white king')){
                kingExists = true;
                break;
            }
            else if(board[i][j] === '')
                continue;
            else if(board[i][j].includes(color))
                break;
            else if(!board[i][j].includes(color))
                pieces.push([board[i][j], {row: i, column: j}]);
        }

        if(kingExists)
            findForkedPieces(pieces);

        kingExists = false;
        pieces = [];

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

        for(let i = row - 1, j = column + 1; i >= 0 && j <= 7; i--, j++){       //south east diagonal
            if(board[i][j].includes(color === 'white' ? 'black king' : 'white king')){
                kingExists = true;
                break;
            }
            else if(board[i][j] === '')
                continue;
            else if(board[i][j].includes(color))
                break;
            else if(!board[i][j].includes(color))
                pieces.push([board[i][j], {row: i, column: j}]);
        }

        if(kingExists)
            findForkedPieces(pieces);


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
    }, [board])
    
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

export default memo(Queen);