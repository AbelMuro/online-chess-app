import React, {useEffect, memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {motion} from 'framer-motion';
import { useDrag } from "react-dnd"
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

function King({color, row, column}) {
    const currentTurn = useSelector(state => state.chess.current_turn);    
    const board = useSelector(state => state.chess.board);   
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
        dispatch({type: 'HIGHLIGHT_KING_SQUARES', payload: {square: {row, column, color}}})
    }


    useEffect(() => {
        dispatch({type: 'IS_KING_IN_CHECK', payload: {square: {row, column, color}}})
    }, [board])

    useEffect(() => {
        dispatch({type: 'COUNT_LEGAL_MOVES', payload: {square: {row, column, color}}});
        
        return () => {
            dispatch({type: 'RESET_LEGAL_MOVES', payload: {square: {row, column, color}}});
        }

    }, [])

    return (
        <motion.div             
            className={styles.container} 
            onClick={handleClick}
            onMouseDown={handleClick}
            style={isDragging ? {opacity: 0} : {opacity: 1}} 
            layoutId={`${color} king`}
            ref={drag}>
                <img className={styles.piece} src={icons[`${color} king`]}/>
        </motion.div>
    )
}

export default memo(King);