import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {usePieceLogic, usePinnedPieces} from '~/hooks';
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

function Bishop({color, row, column}) {
    const [board, currentTurn, handleMouseEnter, handleMouseLeave, handleStyles] = usePieceLogic({color});
    const dispatch = useDispatch();


    const bishopMoveRules = () => {
        dispatch({type: 'HIGHLIGHT_NORTHWEST_SQUARES', payload: {square: {row, column, color}}});
        dispatch({type: 'HIGHLIGHT_NORTHEAST_SQUARES', payload: {square: {row, column, color}}});
        dispatch({type: 'HIGHLIGHT_SOUTHWEST_SQUARES', payload: {square: {row, column, color}}});
        dispatch({type: 'HIGHLIGHT_SOUTHEAST_SQUARES', payload: {square: {row, column, color}}});
    }


    const handleClick = () => {
        dispatch({type: 'PIECE_TO_BE_MOVED', payload: {square: {row, column}}});
        dispatch({type: 'REMOVE_ALL_HIGHLIGHTED_SQUARES'});
        bishopMoveRules();
    }

    useEffect(() => {
        const piece = `bishop ${row} ${column}`;

        dispatch({type: 'CREATE_ILLEGAL_SQUARES_FOR_KING_NORTHWEST', payload: {square: {row, column, color, piece}}});
        dispatch({type: 'CREATE_ILLEGAL_SQUARES_FOR_KING_NORTHEAST', payload: {square: {row, column, color, piece}}});
        dispatch({type: 'CREATE_ILLEGAL_SQUARES_FOR_KING_SOUTHWEST', payload: {square: {row, column, color, piece}}});
        dispatch({type: 'CREATE_ILLEGAL_SQUARES_FOR_KING_SOUTHEAST', payload: {square: {row, column, color, piece}}});

        return () => {
            if(color === 'white')
                dispatch({type: 'CLEAR_ILLEGAL_MOVES_FOR_BLACK_KING', payload: {piece}});
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
            style={handleStyles()}>
                <img className={styles.piece} src={icons[`${color}Bishop`]}/>
        </div>
    )
}

export default Bishop;