import React, {memo, useState} from 'react';
import CountLegalMoves from '~/assets/Components/CountLegalMoves';
import {useDispatch, useSelector} from 'react-redux';
import {motion} from 'framer-motion';
import icons from '~/assets/icons';
import { useDrag } from "react-dnd"
import * as styles from './styles.module.css';

function Pawn({color, row, column, pieceId}) {
    const userColor = useSelector(state => state.chess.players.user_color)
    const [twoSquareMoveAvailable,] = useState((row === 1 && color === 'black') || (row === 6 && color === 'white')); 
    const currentTurn = useSelector(state => state.chess.players.current_turn);                                                  
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
            return color === currentTurn && currentTurn === userColor            
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()   
        })
    })


    const handleMove = () => {
        if(color === currentTurn && currentTurn === userColor){
            dispatch({type: 'PIECE_TO_BE_MOVED', payload: {square: {row, column}}});
            dispatch({type: 'REMOVE_ALL_LEGAL_SQUARES'});
            dispatch({type: 'LEGAL_PAWN_SQUARES', payload: {square: {row, column, color, twoSquareMoveAvailable}}});            
        }
    }


    return(
        <>
        {
            isDragging ?                 
                <div 
                    className={styles.container} 
                    onClick={handleMove} 
                    onMouseDown={handleMove}
                    style={isDragging ? {opacity: 0} : {opacity: 1}} 
                    ref={drag}
                    >
                    <img className={styles.piece} src={icons[`${color} pawn`]}/>  
                </div> :             
                <motion.div 
                    className={styles.container} 
                    onClick={handleMove} 
                    onMouseDown={handleMove}
                    layoutId={pieceId}
                    key={pieceId}
                    ref={drag}
                    >
                        <img className={styles.piece} src={icons[`${color} pawn`]}/>                      
                </motion.div>    
        }    
        <CountLegalMoves row={row} column={column} color={color} pieceId={pieceId}/>   
        </>
    )
}

export default memo(Pawn);