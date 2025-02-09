import React, {memo} from 'react';
import SetPinnedPieces from '~/assets/Components/SetPinnedPieces';
import CountLegalMoves from '~/assets/Components/CountLegalMoves';
import {useDispatch, useSelector} from 'react-redux';
import {motion} from 'framer-motion';
import { useDrag } from "react-dnd"
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

function Queen({color, row, column, pieceId}) {
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
        dispatch({type: 'HIGHLIGHT_NORTH_SQUARES', payload: {square: {row, column, color}}});
        dispatch({type: 'HIGHLIGHT_SOUTH_SQUARES', payload: {square: {row, column, color}}});
        dispatch({type: 'HIGHLIGHT_WEST_SQUARES', payload: {square: {row, column, color}}});
        dispatch({type: 'HIGHLIGHT_EAST_SQUARES', payload: {square: {row, column, color}}});
        dispatch({type: 'HIGHLIGHT_NORTHWEST_SQUARES', payload: {square: {row, column, color}}});
        dispatch({type: 'HIGHLIGHT_NORTHEAST_SQUARES', payload: {square: {row, column, color}}});
        dispatch({type: 'HIGHLIGHT_SOUTHWEST_SQUARES', payload: {square: {row, column, color}}});
        dispatch({type: 'HIGHLIGHT_SOUTHEAST_SQUARES', payload: {square: {row, column, color}}});
    }

    
    return (
        <motion.div             
            className={styles.container} 
            onMouseDown={handleClick}
            onClick={handleClick}
            style={isDragging ? {opacity: 0} : {opacity: 1}} 
            ref={drag}
            layoutId={pieceId}
            >
                <img className={styles.piece} src={icons[`${color} queen`]}/>
                <SetPinnedPieces row={row} column={column} color={color}/>
                <CountLegalMoves row={row} column={column} color={color} pieceId={pieceId}/>
        </motion.div>
    )
}

export default memo(Queen);