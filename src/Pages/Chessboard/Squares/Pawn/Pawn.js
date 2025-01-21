import React, {memo, useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {usePieceLogic} from '~/hooks';
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

function Pawn({color, row, column}) {
    const pawnRef = useRef();
    //const enPassant = useSelector(state => state.chess.en_passant);
    const [board, currentTurn, handleMouseEnter, handleMouseLeave, handleStyles] = usePieceLogic({color});
    //const board = useSelector(state => state.chess.board);                                                                
    const dispatch = useDispatch();


    const pawnMoveRules = () => {
        dispatch({type: 'HIGHLIGHT_PAWN_SQUARES', payload: {square: {row, column, color}}});
    }

    /* 
        const pawnTakeRules = () =>{
            const leftCorner = color === 'white' ? {row: row + 1, column: column - 1} : {row: row - 1, column: column - 1};
            const rightCorner = color === 'white' ? {row: row + 1, column: column + 1} : {row: row - 1, column: column + 1};

            if(enPassant){
                const enPassant_squareToMoveInto = enPassant.squareToMoveInto;
                const enPassant_pieceToBeTaken = enPassant.pieceToBeTaken;
                if(((enPassant_squareToMoveInto.row === leftCorner.row && enPassant_squareToMoveInto.column === leftCorner.column) || (enPassant_squareToMoveInto.row === rightCorner.row && enPassant_squareToMoveInto.column === rightCorner.column))){
                    const pieceToTake = board[enPassant_pieceToBeTaken.row]?.[enPassant_pieceToBeTaken.column];
                    if((color === 'white' && pieceToTake.includes('black')) || (color === 'black' && pieceToTake.includes('white')))
                        dispatch({type: 'HIGHLIGHT_RED_SQUARES', payload: {squares: [{row: enPassant_squareToMoveInto.row, column: enPassant_squareToMoveInto.column}]}})            
                }
            }
        }    
    */


    const handleMove = () => {
        dispatch({type: 'PIECE_TO_BE_MOVED', payload: {square: {row, column}}});
        dispatch({type: 'REMOVE_ALL_HIGHLIGHTED_SQUARES'});
        pawnMoveRules();  
        //pawnTakeRules();     
    }


    useEffect(() => {
        const piece = `pawn ${row} ${column}`;
        dispatch({type: 'CREATE_ILLEGAL_SQUARES_FOR_KING_PAWN', payload: {square: {row, column, color, piece}}});

        return () => {
            if(color === 'white')
                dispatch({type: 'CLEAR_ILLEGAL_MOVES_FOR_BLACK_KING', payload: {piece}})
            else
                dispatch({type: 'CLEAR_ILLEGAL_MOVES_FOR_WHITE_KING', payload: {piece}});
        }
    }, [board])

    return(
        <div 
            className={styles.container} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
            onClick={currentTurn === color ? handleMove : () => {}}
            ref={pawnRef}
            style={handleStyles()}
            >
                <img className={styles.piece} src={icons[`${color}Pawn`]}/>  
        </div> 
    )
}

export default memo(Pawn);