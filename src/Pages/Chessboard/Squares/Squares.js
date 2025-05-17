import React, {useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';
import Dialog from '~/assets/Components/Dialog';
import { useDrop } from "react-dnd"
import {useSelector, useDispatch} from 'react-redux';
import {syncDatabaseWithState} from '!/ChessReducer'
import Pawn from './Pawn';
import Rook from './Rook';
import Knight from './Knight';
import Bishop from './Bishop';
import Queen from './Queen';
import King from './King';
import icons from '~/assets/icons';
import * as styles from './styles.module.css'

// The Squares components is responsible for determining if this square is a legal square where a piece can be moved
// the child components of this component are the actual pieces, they are responsible for implementing the rules for 'moving' and 'taking' for each piece

function Squares({row, column, colorOfSquare, id}) {
    const {matchId} = useParams();
    const currentSquare = useSelector(state => state.chess.board[row][column]);
    const legalSquare = useSelector(state => state.chess.legal_squares[row][column]);
    const hasKingBeenMoved = useSelector(state => state.chess.castleling.has_king_been_moved);
    const hasQueenSideRookBeenMoved = useSelector(state => state.chess.castleling.has_rooks_been_moved[0]);
    const hasKingSideRookBeenMoved = useSelector(state => state.chess.castleling.has_rooks_been_moved[1]);
    const promotionDialogButtonRef = useRef();
    const color = currentSquare.includes('white') ? 'white' : 'black';
    const piece = currentSquare.slice(6, currentSquare.length);
    const dispatch = useDispatch();
    const [{handlerId}, drop] = useDrop({
        accept: 'piece',
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId()
        }),
        canDrop: () => {
            return legalSquare;
        },
        drop: () => {
            handleClick();
        }
    })

    const handlePromotion = (handleOpen, choosenPiece) => {
        dispatch({type: 'PROMOTION', payload: {square: {row, column}, piece: choosenPiece, pieceId: currentSquare}});
        dispatch({type: 'CHANGE_TURN'});
        matchId !== 'ai' && dispatch(syncDatabaseWithState(matchId))
        handleOpen();
    }

    const handleClick = () => { 
        if(!legalSquare) return; 

        if(legalSquare === 'kingSide' || legalSquare === 'queenSide'){
            dispatch({type: 'IMPLEMENT_CASTLELING', payload: {castleling: legalSquare}})  
            dispatch({type: 'CHANGE_TURN'});   
            matchId !== 'ai' && dispatch(syncDatabaseWithState(matchId))
        }                                             
             
        else if(legalSquare === 'enable enpassant'){
            dispatch({type: 'ENABLE_ENPASSANT', payload: {square: {row, column}}})
            dispatch({type: 'CHANGE_TURN'});
            matchId !== 'ai' && dispatch(syncDatabaseWithState(matchId))
        }
            
        else if(legalSquare === 'take enpassant'){
            dispatch({type: 'IMPLEMENT_ENPASSANT', payload: {square: {row, column}}})
            dispatch({type: 'CHANGE_TURN'});
            matchId !== 'ai' && dispatch(syncDatabaseWithState(matchId))
        }
            
        else if(legalSquare === 'promotion')
            promotionDialogButtonRef.current.click();
        else{
            dispatch({type: 'MOVE_PIECE', 
                payload: {
                square: {row, column},
                ...(piece?.includes('king') && {hasKingBeenMoved}),                                             //we record the first time the king or rooks have been moved
                ...((piece?.includes('rook') && piece?.includes('a')) && {hasRookBeenMoved: hasQueenSideRookBeenMoved}),
                ...((piece?.includes('rook') && piece?.includes('h')) && {hasRookBeenMoved: hasKingSideRookBeenMoved})            
                }
            });
            dispatch({type: 'CHANGE_TURN'});   
            console.log(matchId)
            matchId !== 'ai' && dispatch(syncDatabaseWithState(matchId))           
        }
    }

    useEffect(() => {
        const squareRef = document.getElementById(id)

        if(colorOfSquare === 'lightSquare')
            squareRef.classList.add(styles.lightSquare);
        else
            squareRef.classList.add(styles.darkSquare)
            
    }, [colorOfSquare])



    return(
        <>
            <div 
                id={id}
                ref={drop}
                data-handler-id={handlerId}
                className={styles.chess_board_square} 
                onClick={handleClick}> 
                    {piece.includes('pawn') && <Pawn color={color} row={row} column={column} pieceId={`${currentSquare}`}/>}
                    {piece.includes('queen') && <Queen color={color} row={row} column={column} pieceId={`${currentSquare}`}/>}
                    {piece.includes('rook') && <Rook color={color} row={row} column={column} pieceId={`${currentSquare}`}/>}
                    {piece.includes('knight') && <Knight color={color} row={row} column={column} pieceId={`${currentSquare}`}/>}
                    {piece.includes('bishop') && <Bishop color={color} row={row} column={column} pieceId={`${currentSquare}`}/>}
                    {piece.includes('king') && <King color={color} row={row} column={column} pieceId={`${currentSquare}`}/>}
            </div>      
            {
                (row === 7 || row === 0) && 
                        <Dialog 
                            Content={({handleOpen}) => {
                                return (
                                    <>
                                        <h1 className={styles.content_title}>
                                            Select Piece
                                        </h1>
                                        <div className={styles.content_pieces}>
                                            <button className={styles.content_piece} onClick={() => handlePromotion(handleOpen, 'queen')}>
                                                <img src={icons[`white queen`]}/>
                                            </button>
                                            <button className={styles.content_piece} onClick={() => handlePromotion(handleOpen, 'rook')}>
                                                <img src={icons[`white rook`]}/>
                                            </button>
                                            <button className={styles.content_piece} onClick={() => handlePromotion(handleOpen, 'bishop')}>
                                                <img src={icons[`white bishop`]}/>
                                            </button>
                                            <button className={styles.content_piece} onClick={() => handlePromotion(handleOpen, 'knight')}>
                                                <img src={icons[`white knight`]}/>
                                            </button>
                                        </div>
                                    </>
                                )
                            }}
                            Button={({handleOpen}) => {
                                return(
                                    <button ref={promotionDialogButtonRef} className={styles.ignore} onClick={handleOpen}>
                                    </button>
                                )
                            }}
                        />
                }   
        </>

    )
}

export default Squares;