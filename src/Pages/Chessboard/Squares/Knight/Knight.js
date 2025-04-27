import React, {memo} from 'react';
import CountLegalMoves from '~/assets/Components/CountLegalMoves';
import {useDispatch, useSelector} from 'react-redux';
import {motion} from 'framer-motion';
import { useDrag } from "react-dnd"
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

function Knight({color, row, column, pieceId}) {
    const userColor = useSelector(state => state.chess.user_color); 
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
            return color === currentTurn && currentTurn === userColor         
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()   
        })
    })

    const handleClick = () => {
        if(color === currentTurn && currentTurn === userColor){
            dispatch({type: 'PIECE_TO_BE_MOVED', payload: {square: {row, column}}});
            dispatch({type: 'REMOVE_ALL_LEGAL_SQUARES'});
            dispatch({type: 'LEGAL_KNIGHT_SQUARES', payload: {square: {row, column, color}}})            
        }
    }




    return <>
        {
        isDragging ?         
            <div             
                className={styles.container} 
                onClick={handleClick}
                style={isDragging ? {opacity: 0} : {}}
                onMouseDown={handleClick}
                ref={drag}>
                    <img className={styles.piece} src={icons[`${color} knight`]} />
            </div> : 
            <motion.div             
                className={styles.container} 
                onClick={handleClick}
                onMouseDown={handleClick}
                ref={drag}
                layoutId={pieceId}
                key={pieceId}>
                    <img className={styles.piece} src={icons[`${color} knight`]} />
            </motion.div>
        }
        <CountLegalMoves row={row} column={column} color={color} pieceId={pieceId}/>
    </>
    
}

export default memo(Knight);