import React, {useEffect, useRef} from 'react';
import { useDrop } from "react-dnd"
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

function Squares({row, column, colorOfSquare, id}) {
    const currentSquare = useSelector(state => state.chess.board[row][column]);
    const highlightedSquare = useSelector(state => state.chess.highlighted_squares[row][column]);
    const color = currentSquare.includes('white') ? 'white' : 'black';
    const piece = currentSquare.slice(6, currentSquare.length);
    const dispatch = useDispatch();
    const [{handlerId}, drop] = useDrop({
        accept: 'piece',
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId()
        }),
        canDrop: () => {
            return !!highlightedSquare;
        },
        drop: () => {
            handleClick();
        }

    })

    const handleStyles = () => {
        if(highlightedSquare.includes('red'))
            return {backgroundColor: 'rgba(255, 0, 0, 0.4)', cursor: 'pointer'}
        else if(highlightedSquare.includes('blue'))
            return {backgroundColor: 'rgba(77, 77, 255, 0.4)', cursor: 'pointer'}
        else
            return {};
    }

    const handleClick = () => { 
        if(!highlightedSquare) return;    
           
        dispatch({type: 'MOVE_PIECE', payload: {square: {row, column}}});
        dispatch({type: 'CHANGE_TURN'})     
    }

    useEffect(() => {
        const squareRef = document.getElementById(id)

        if(colorOfSquare === 'lightSquare')
            squareRef.classList.add(styles.lightSquare);
        else
            squareRef.classList.add(styles.darkSquare)
            
    }, [colorOfSquare])


    return(
        <div 
            id={id}
            ref={drop}
            data-handler-id={handlerId}
            className={styles.chess_board_square} 
            style={handleStyles()}
            onClick={handleClick}> 
                {piece.includes('pawn') && <Pawn color={color} row={row} column={column} pieceId={`${currentSquare}`}/>}
                {piece.includes('queen') && <Queen color={color} row={row} column={column} pieceId={`${currentSquare}`}/>}
                {piece.includes('rook') && <Rook color={color} row={row} column={column} pieceId={`${currentSquare}`}/>}
                {piece.includes('knight') && <Knight color={color} row={row} column={column} pieceId={`${currentSquare}`}/>}
                {piece.includes('bishop') && <Bishop color={color} row={row} column={column} pieceId={`${currentSquare}`}/>}
                {piece.includes('king') && <King color={color} row={row} column={column} pieceId={`${currentSquare}`}/>}
        </div> 
    )
}

export default Squares;