import React, {useEffect, memo} from 'react';
import CheckStalemate from './CheckStalemate';
import {useDispatch, useSelector} from 'react-redux';
import {motion} from 'framer-motion';
import { useDrag } from "react-dnd"
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

function King({color, row, column, pieceId}) {
    const currentTurn = useSelector(state => state.chess.current_turn);    
    const userColor = useSelector(state => state.chess.user_color); 
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
            return color === currentTurn && currentTurn === userColor;            
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()   
        })
    })


    const handleClick = () => {
        if(color === currentTurn && currentTurn === userColor){
            dispatch({type: 'PIECE_TO_BE_MOVED', payload: {square: {row, column}}});
            dispatch({type: 'REMOVE_ALL_LEGAL_SQUARES'});
            dispatch({type: 'LEGAL_KING_SQUARES', payload: {square: {row, column, color}}})            
        }
    }


    useEffect(() => {
        if(currentTurn === userColor && color === currentTurn && currentTurn === userColor)
            dispatch({type: 'IS_KING_IN_CHECK', payload: {square: {row, column, color}}})
        
    }, [board])

    useEffect(() => {
        dispatch({type: 'CHECK_FOR_DOUBLE_PINS', payload: {square: {row, column, color}}})
    }, [board])

    return isDragging ?         
        <div             
            className={styles.container} 
            onClick={handleClick}
            onMouseDown={handleClick}
            style={isDragging ? {opacity: 0} : {opacity: 1}} 
            ref={drag}>
                <img className={styles.piece} src={icons[`${color} king`]} />
                <CheckStalemate row={row} column={column} color={color}/>
        </div> : (
        <motion.div             
            className={styles.container} 
            onClick={handleClick}
            onMouseDown={handleClick}
            layoutId={pieceId}
            key={pieceId}
            ref={drag}>
                <img className={styles.piece} src={icons[`${color} king`]} />
                <CheckStalemate row={row} column={column} color={color}/>
        </motion.div>
    )
}

export default memo(King);