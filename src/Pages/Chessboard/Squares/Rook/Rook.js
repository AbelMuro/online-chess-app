import React, {useEffect} from 'react';
import SetPinnedPieces from '~/assets/Components/SetPinnedPieces';
import CountLegalMoves from '~/assets/Components/CountLegalMoves';
import {motion} from 'framer-motion';
import {useDispatch, useSelector} from 'react-redux';
import icons from '~/assets/icons';
import { useDrag } from "react-dnd"
import * as styles from './styles.module.css';


function Rook({color, row, column, pieceId}) {
    const dispatch = useDispatch();
    const userColor = useSelector(state => state.chess.players.user_color); 
    const currentTurn = useSelector(state => state.chess.players.current_turn);   
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
            dispatch({type: 'LEGAL_NORTH_SQUARES', payload: {square: {row, column, color}}});
            dispatch({type: 'LEGAL_SOUTH_SQUARES', payload: {square: {row, column, color}}});
            dispatch({type: 'LEGAL_WEST_SQUARES', payload: {square: {row, column, color}}});
            dispatch({type: 'LEGAL_EAST_SQUARES', payload: {square: {row, column, color}}});            
        }
    }

    useEffect(() => {
        if(userColor !== color) return;

        if(userColor === 'white' && pieceId === 'a' && (row !== 7 || column !== 0))
            dispatch({type: 'HAS_ROOKS_BEEN_MOVED', payload: {moved: true, whichRook: 'queen-side'}})
        else if(userColor === 'white' && pieceId === 'h' && (row !== 7 || column !== 7))
            dispatch({type: 'HAS_ROOKS_BEEN_MOVED', payload: {moved: true, whichRook: 'king-side'}})   
        else if(userColor === 'black' && pieceId === 'a' && (row !== 0 || column !== 0))
            dispatch({type: 'HAS_ROOKS_BEEN_MOVED', payload: {moved: true, whichRook: 'queen-side'}})
        else if(userColor === 'black' && pieceId === 'h' && (row !== 0 || column !== 7))
            dispatch({type: 'HAS_ROOKS_BEEN_MOVED', payload: {moved: true, whichRook: 'king-side'}})
    }, [])

    return <>
        {isDragging ?         
            <div 
                className={styles.container} 
                onClick={handleClick} 
                onMouseDown={handleClick}
                style={isDragging ? {opacity: 0} : {opacity: 1}}
                ref={drag}
                >
                    <img className={styles.piece} src={icons[`${color} rook`]} />
            </div> : 
            <motion.div 
                className={styles.container} 
                onClick={handleClick} 
                onMouseDown={handleClick}
                ref={drag}
                layoutId={pieceId}
                key={pieceId}
                >
                    <img className={styles.piece} src={icons[`${color} rook`]} />
            </motion.div>   
        }
        <SetPinnedPieces row={row} column={column} color={color}/>
        <CountLegalMoves row={row} column={column} color={color} pieceId={pieceId}/>
    </>
}

export default Rook;