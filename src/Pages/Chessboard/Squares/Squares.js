import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Pawn from './Pawn';
import Rook from './Rook';
import Knight from './Knight';
import Bishop from './Bishop';
import Queen from './Queen';
import King from './King';
import * as styles from './styles.module.css'

//The Squares components is responsible for displaying the red or blue squares; 
// red means that the square has a piece that can be taken
// blue means that the square is a legal square that a certain piece can move into (check redux store for the pieceToBeMoved property)
// the child components of this component are the actual pieces, they are responsible for implementing the rules for 'moving' and 'taking' for each piece

function Squares({row, column}) {
    const currentSquare = useSelector(state => state.chess.board[row][column]);
    const highlightedSquare = useSelector(state => state.chess.highlighted_squares[row][column]);
    const color = currentSquare.slice(0, 5);
    const piece = currentSquare.slice(6, currentSquare.length);
    const enPassant = useSelector(state => state.chess.en_passant);
    const dispatch = useDispatch();

    const handleStyles = () => {
        if(highlightedSquare === 'red')
            return {backgroundColor: 'rgba(255, 0, 0, 0.6)', cursor: 'pointer'}
        else if(highlightedSquare === 'blue')
            return {backgroundColor: 'rgba(0, 0, 255, 0.6)', cursor: 'pointer'}
        else
            return {};
    }

    const handleClick = () => { 
        if(!highlightedSquare) return;

        if(highlightedSquare === 'red' && enPassant && piece === '')
            dispatch({type: 'MOVE_PIECE_WITH_ENPASSANT'});
        else
            dispatch({type: 'MOVE_PIECE', payload: {square: {row, column}}});
        dispatch({type: 'CHANGE_TURN'})          
        dispatch({type: 'SET_PINNED_PIECES', payload: {square: {row, column}}});
    }

    return(
        <div 
            className={styles.chess_board_square} 
            style={handleStyles()}
            onClick={handleClick}> 
                {piece === 'pawn' && <Pawn color={color} row={row} column={column} />}
                {piece === 'queen' && <Queen color={color} row={row} column={column}/>}
                {piece === 'rook' && <Rook color={color} row={row} column={column}/>}
                {piece === 'knight' && <Knight color={color} row={row} column={column}/>}
                {piece === 'bishop' && <Bishop color={color} row={row} column={column} />}
                {piece === 'king' && <King color={color} row={row} column={column}/>}
        </div> 
    )
}

export default Squares;