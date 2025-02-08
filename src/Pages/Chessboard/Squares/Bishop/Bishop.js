import React, {useEffect, memo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {motion} from 'framer-motion';
import { useDrag } from "react-dnd"
import icons from '~/assets/icons';
import * as styles from './styles.module.css';


//this is where i left off, i will need to cancel the layoutId animation by using conditional rendering

function Bishop({color, row, column, id}) { 
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
        dispatch({type: 'HIGHLIGHT_NORTHWEST_SQUARES', payload: {square: {row, column, color}}});
        dispatch({type: 'HIGHLIGHT_NORTHEAST_SQUARES', payload: {square: {row, column, color}}});
        dispatch({type: 'HIGHLIGHT_SOUTHWEST_SQUARES', payload: {square: {row, column, color}}});
        dispatch({type: 'HIGHLIGHT_SOUTHEAST_SQUARES', payload: {square: {row, column, color}}});
    }


    useEffect(() => {
        dispatch({type: 'SET_PINNED_PIECES', payload: {square: {row, column, color}}})

        return () => {
            dispatch({type: 'CLEAR_PINNED_PIECES', payload: {square: {row, column}}})
        }
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
            onMouseDown={handleClick}
            onClick={handleClick}
            style={isDragging ? {opacity: 0} : {opacity: 1}} 
            ref={drag}
            layoutId={`${color} bishop ${id}`}
            >
                <img className={styles.piece} src={icons[`${color} bishop`]}/>
        </motion.div>
    )
}

export default memo(Bishop);