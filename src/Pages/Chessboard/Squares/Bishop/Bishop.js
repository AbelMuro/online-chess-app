import React, {useEffect, memo} from 'react';
import {useDispatch} from 'react-redux';
import {usePieceLogic} from '~/hooks';
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

function Bishop({color, row, column}) {
    const [board, handleMouseEnter, handleMouseLeave] = usePieceLogic({color});
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
        dispatch({type: 'SET_PINNED_PIECES', payload: {square: {row, column, color}}})

        return () => {
            dispatch({type: 'CLEAR_PINNED_PIECES', payload: {square: {row, column}}})
        }
    }, [board])

    return (
        <div             
            className={styles.container} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
            onClick={handleClick}>
                <img className={styles.piece} src={icons[`${color}Bishop`]}/>
        </div>
    )
}

export default memo(Bishop);