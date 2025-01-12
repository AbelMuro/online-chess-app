import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Pawn from './Pawn';
import Rook from './Rook';
import Knight from './Knight';
import Bishop from './Bishop';
import Queen from './Queen';
import King from './King';
import * as styles from './styles.module.css'

function Pieces({piece, color, row, column}) {
    const [legal, setLegal] = useState(false)
    const highlightedSquares = useSelector(state => state.chess.highlighted_squares);    
    const dispatch = useDispatch();

    const handleClick = () => { 
        if(!legal) return;

        dispatch({type: 'MOVE_PIECE', payload: {square: {row, column}}});
        dispatch({type: 'HIGHLIGHT_SQUARES', payload: {squares: []}});
    }

    useEffect(() => {
        const currentSquare = {row, column};
        let isLegal = false;
        highlightedSquares.some((square) => {
            if(square.row === currentSquare.row && square.column === currentSquare.column){
                isLegal = true;
                return true;
            }           
            else 
                return false;
        });

        setLegal(isLegal);

    }, [highlightedSquares])


    return(
        <div 
            className={styles.chess_board_square} 
            style={legal ? {backgroundColor: 'rgba(0, 0, 255, 0.6)', cursor: 'pointer'} : {}}
            onClick={handleClick}> 
                {piece === 'pawn' && <Pawn color={color} position={{row, column}}/>}
                {piece === 'queen' && <Queen color={color} position={{row, column}}/>}
                {piece === 'rook' && <Rook color={color} position={{row, column}}/>}
                {piece === 'knight' && <Knight color={color} position={{row, column}}/>}
                {piece === 'bishop' && <Bishop color={color} position={{row, column}}/>}
                {piece === 'king' && <King color={color} position={{row, column}}/>}
        </div> 
    )
}

export default Pieces;