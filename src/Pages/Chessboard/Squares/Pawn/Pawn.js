import React, {memo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import icons from '~/assets/icons';
import { useDrag } from "react-dnd"
import * as styles from './styles.module.css';

function Pawn({color, row, column}) {
    const [twoSquareMoveAvailable,] = useState((row === 1 && color === 'white') || (row === 6 && color === 'black'));
    const currentTurn = useSelector(state => state.chess.current_turn);                                                  
    const dispatch = useDispatch();
    const [{isDragging}, drag] = useDrag({
        type: 'piece',
        item: () => {
            return {row, column};
        },
        isDragging: (monitor) => { 
            const square = monitor.getItem();            
            return row === square.row && column === square.column; 
        },
        canDrag: () => {                      
            return currentTurn === color;            
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()   
        })
    })

    const handleMove = () => {
        if(currentTurn !== color) return;
        dispatch({type: 'PIECE_TO_BE_MOVED', payload: {square: {row, column}}});
        dispatch({type: 'REMOVE_ALL_HIGHLIGHTED_SQUARES'});
        dispatch({type: 'HIGHLIGHT_PAWN_SQUARES', payload: {square: {row, column, color, twoSquareMoveAvailable}}});
    }


    return(
        <div 
            className={styles.container} 
            onClick={handleMove} 
            onMouseDown={handleMove}
            style={isDragging ? {opacity: 0} : {opacity: 1}} 
            ref={drag}
            >
                <img className={styles.piece} src={icons[`${color}Pawn`]} />  
        </div> 
    )
}

export default memo(Pawn);