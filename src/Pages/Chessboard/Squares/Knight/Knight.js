import React, {memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useDrag } from "react-dnd"
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

function Knight({color, row, column}) {
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

    const handleClick = () => {
        if(currentTurn !== color) return;
        dispatch({type: 'PIECE_TO_BE_MOVED', payload: {square: {row, column}}});
        dispatch({type: 'REMOVE_ALL_HIGHLIGHTED_SQUARES'});
        dispatch({type: 'HIGHLIGHT_KNIGHT_SQUARES', payload: {square: {row, column, color}}})
    }

    return (
        <div             
            className={styles.container} 
            onClick={handleClick}
            onMouseDown={handleClick}
            ref={drag}>
            <img className={styles.piece} src={icons[`${color}Knight`]}/>
        </div>
    )
}

export default memo(Knight);