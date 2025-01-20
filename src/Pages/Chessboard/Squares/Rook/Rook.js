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
        dispatch({type: 'REMOVE_ALL_HIGHLIGHTED_SQUARES'});
        rookMoveRules();
    }

     useEffect(() => {
        const piece = `rook ${row} ${column}`;
 
         dispatch({type: 'CREATE_ILLEGAL_SQUARES_FOR_KING_NORTH', payload: {square: {row, column, color, piece}}});
         dispatch({type: 'CREATE_ILLEGAL_SQUARES_FOR_KING_EAST', payload: {square: {row, column, color, piece}}});
         dispatch({type: 'CREATE_ILLEGAL_SQUARES_FOR_KING_WEST', payload: {square: {row, column, color, piece}}});
         dispatch({type: 'CREATE_ILLEGAL_SQUARES_FOR_KING_SOUTH', payload: {square: {row, column, color, piece}}});
 
         return () => {
             if(color === 'white')
                 dispatch({type: 'CLEAR_ILLEGAL_MOVES_FOR_BLACK_KING', payload: {piece}})
             else
                 dispatch({type: 'CLEAR_ILLEGAL_MOVES_FOR_WHITE_KING', payload: {piece}});
         }
     }, [board])

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