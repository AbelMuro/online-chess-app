import React, {memo, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {usePieceLogic} from '~/hooks';
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

function Pawn({color, row, column}) {
    const pawnRef = useRef();
    const [twoSquareMoveAvailable,] = useState((row === 1 && color === 'white') || (row === 6 && color === 'black'));
    const [, handleMouseEnter, handleMouseLeave] = usePieceLogic({color});                                                            
    const dispatch = useDispatch();

    const pawnMoveRules = () => {
        dispatch({type: 'HIGHLIGHT_PAWN_SQUARES', payload: {square: {row, column, color, twoSquareMoveAvailable}}});
    }


    const handleMove = () => {
        dispatch({type: 'PIECE_TO_BE_MOVED', payload: {square: {row, column}}});
        dispatch({type: 'REMOVE_ALL_HIGHLIGHTED_SQUARES'});
        pawnMoveRules();    
    }

    return(
        <div 
            className={styles.container} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
            onClick={handleMove}
            ref={pawnRef}
            >
                <img className={styles.piece} src={icons[`${color}Pawn`]}/>  
        </div> 
    )
}

export default memo(Pawn);