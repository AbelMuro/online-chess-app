import React, {memo, useState, useEffect, useRef} from 'react';
import Dialog from '~/assets/Components/Dialog';
import CountLegalMoves from '~/assets/Components/CountLegalMoves';
import {useDispatch, useSelector} from 'react-redux';
import {motion} from 'framer-motion';
import icons from '~/assets/icons';
import { useDrag } from "react-dnd"
import * as styles from './styles.module.css';


function Pawn({color, row, column, pieceId}) {
    const userColor = useSelector(state => state.chess.user_color)
    const [twoSquareMoveAvailable,] = useState((row === 1 && color === 'black') || (row === 6 && color === 'white'));
    const [promotion, setPromotion] = useState((row === 7 && color === 'black') || (row === 0 && color === 'white'));
    const buttonRef = useRef(); 
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
            return color === currentTurn && currentTurn === userColor;            
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()   
        })
    })

    const handlePromotion = (handleOpen, choosenPiece) => {
        dispatch({type: 'PROMOTION', payload: {square: {row, column}, piece: choosenPiece, color, pieceId}});
        handleOpen();
    }

    const handleMove = () => {
        if(color === currentTurn && currentTurn === userColor){
            dispatch({type: 'PIECE_TO_BE_MOVED', payload: {square: {row, column}}});
            dispatch({type: 'REMOVE_ALL_LEGAL_SQUARES'});
            dispatch({type: 'LEGAL_PAWN_SQUARES', payload: {square: {row, column, color, twoSquareMoveAvailable}}});            
        }
    }


    useEffect(() => {
        if(promotion)
            buttonRef.current.click();
    }, [promotion])


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
                    <CountLegalMoves row={row} column={column} color={color} pieceId={pieceId}/>
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
                        <CountLegalMoves row={row} column={column} color={color} pieceId={pieceId}/>
                    
                </motion.div>    
        }       
        <Dialog 
                Content={({handleOpen}) => {
                    return (
                        <>
                            <h1 className={styles.content_title}>
                                Select Piece
                            </h1>
                            <div className={styles.content_pieces}>
                                <button className={styles.content_piece} onClick={() => handlePromotion(handleOpen, 'queen')}>
                                    <img src={icons[`${color} queen`]}/>
                                </button>
                                <button className={styles.content_piece} onClick={() => handlePromotion(handleOpen, 'rook')}>
                                    <img src={icons[`${color} rook`]}/>
                                </button>
                                <button className={styles.content_piece} onClick={() => handlePromotion(handleOpen, 'bishop')}>
                                    <img src={icons[`${color} bishop`]}/>
                                </button>
                                <button className={styles.content_piece} onClick={() => handlePromotion(handleOpen, 'knight')}>
                                    <img src={icons[`${color} knight`]}/>
                                </button>
                            </div>
                        </>
                    )
                }}
                Button={({handleOpen}) => {
                    return(
                        <button ref={buttonRef} className={styles.ignore} onClick={handleOpen}>
                        </button>
                    )
                }}
            />
        </>

    )
}

export default memo(Pawn);