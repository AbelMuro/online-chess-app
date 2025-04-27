import React, {useEffect, useState} from 'react';
import { useDrop } from "react-dnd"
import {useSelector, useDispatch} from 'react-redux';
import Pawn from './Pawn';
import Rook from './Rook';
import Knight from './Knight';
import Bishop from './Bishop';
import Queen from './Queen';
import King from './King';
import * as styles from './styles.module.css'

//The Squares components is responsible for determining if this square is a legal square where a piece can be moved
// the child components of this component are the actual pieces, they are responsible for implementing the rules for 'moving' and 'taking' for each piece

function Squares({row, column, colorOfSquare, id}) {
    const currentSquare = useSelector(state => state.chess.board[row][column]);
    const legalSquare = useSelector(state => state.chess.legal_squares[row][column]);
    const hasKingBeenMoved = useSelector(state => state.chess.castleling.has_king_been_moved);
    const hasQueenSideRookBeenMoved = useSelector(state => state.chess.castleling.has_rooks_been_moved[0]);
    const hasKingSideRookBeenMoved = useSelector(state => state.chess.castleling.has_rooks_been_moved[1]);
    const color = currentSquare.includes('white') ? 'white' : 'black';
    const piece = currentSquare.slice(6, currentSquare.length);
    const dispatch = useDispatch();
    const [{handlerId}, drop] = useDrop({
        accept: 'piece',
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId()
        }),
        canDrop: () => {
            return legalSquare;
        },
        drop: () => {
            handleClick();
        }
    })

    const handleClick = () => { 
        if(!legalSquare) return; 

        if(legalSquare === 'kingSide' || legalSquare === 'queenSide')                                             
            dispatch({type: 'IMPLEMENT_CASTLELING', payload: {castleling: legalSquare}})   
        else if(legalSquare === 'enable enpassant')
            dispatch({type: 'ENABLE_ENPASSANT', payload: {square: {row, column}}})
        else if(legalSquare === 'take enpassant')
            dispatch({type: 'IMPLEMENT_ENPASSANT', payload: {square: {row, column}}})
        else
            dispatch({type: 'MOVE_PIECE', 
                payload: {
                square: {row, column},
                ...(piece?.includes('king') && {hasKingBeenMoved}),                                             //we record the first time the king or rooks have been moved
                ...((piece?.includes('rook') && piece?.includes('a')) && {hasRookBeenMoved: hasQueenSideRookBeenMoved}),
                ...((piece?.includes('rook') && piece?.includes('h')) && {hasRookBeenMoved: hasKingSideRookBeenMoved})            
                }
            });
        
        dispatch({type: 'CHANGE_TURN'});     
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