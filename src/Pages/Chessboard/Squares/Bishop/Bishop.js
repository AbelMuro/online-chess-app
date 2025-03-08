import React, {memo} from 'react';
import SetPinnedPieces from '~/assets/Components/SetPinnedPieces';
import CountLegalMoves from '~/assets/Components/CountLegalMoves';
import {useDispatch, useSelector} from 'react-redux';
import {motion} from 'framer-motion';
import { useDrag } from "react-dnd"
import icons from '~/assets/icons';
import * as styles from './styles.module.css';


function Bishop({color, row, column, pieceId}) { 
    const currentTurn = useSelector(state => state.chess.current_turn);   
    const userColor = useSelector(state => state.chess.user_color)  
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
            return color === currentTurn && currentTurn === userColor;;            
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()   
        })      
    })


    const handleClick = () => {
        if(color === currentTurn && currentTurn === userColor){
            dispatch({type: 'PIECE_TO_BE_MOVED', payload: {square: {row, column}}});
            dispatch({type: 'REMOVE_ALL_LEGAL_SQUARES'});
            dispatch({type: 'LEGAL_NORTHWEST_SQUARES', payload: {square: {row, column, color}}});
            dispatch({type: 'LEGAL_NORTHEAST_SQUARES', payload: {square: {row, column, color}}});
            dispatch({type: 'LEGAL_SOUTHWEST_SQUARES', payload: {square: {row, column, color}}});
            dispatch({type: 'LEGAL_SOUTHEAST_SQUARES', payload: {square: {row, column, color}}});            
        }
    }

    return isDragging ?        
        <div             
            className={styles.container} 
            onMouseDown={handleClick}
            onClick={handleClick}
            style={isDragging ? {opacity: 0} : {opacity: 1}} 
            ref={drag}
            >
                <img className={styles.piece} src={icons[`${color} bishop`]} />
                <SetPinnedPieces row={row} column={column} color={color}/>
                <CountLegalMoves row={row} column={column} color={color} pieceId={pieceId}/>
        </div> : (
        <motion.div             
            className={styles.container} 
            onMouseDown={handleClick}
            onClick={handleClick}
            ref={drag}
            layoutId={pieceId}
            key={pieceId}
            >
                <img className={styles.piece} src={icons[`${color} bishop`]} />
                <SetPinnedPieces row={row} column={column} color={color}/>
                <CountLegalMoves row={row} column={column} color={color} pieceId={pieceId}/>
        </motion.div>
    )
}

export default memo(Bishop);