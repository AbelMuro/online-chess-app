import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Pawn from './Pawn';
import Rook from './Rook';
import Knight from './Knight';
import Bishop from './Bishop';
import Queen from './Queen';
import King from './King';
import * as styles from './styles.module.css'

//this is where i left off, i want to optimize my code here to make sure that en passant is correctly implemented
//The Squares components is responsible for displaying the red or blue squares; 
// red means that the square has a piece that can be taken
// blue means that the square is a legal square that a certain piece can move into (check redux store for the pieceToBeMoved property)
// the child components of this component are the actual pieces, they are responsible for implementing the rules for 'moving' and 'taking' for each piece




function Squares({piece, color, row, column}) {
    const [blueSquare, setBlueSquare] = useState(false);
    const [redSquare, setRedSquare] = useState(false);
    const blue_squares = useSelector(state => state.chess.blue_squares);    
    const red_squares = useSelector(state => state.chess.red_squares);
    const enPassant = useSelector(state => state.chess.en_passant);
    const dispatch = useDispatch();

    const handleStyles = () => {
        if(redSquare)
            return {backgroundColor: 'rgba(255, 0, 0, 0.6)', cursor: 'pointer'}
        else if(blueSquare)
            return {backgroundColor: 'rgba(0, 0, 255, 0.6)', cursor: 'pointer'}
        else
            return {};
    }

    const handleClick = () => { 
        if(!blueSquare && !redSquare) return;

        if(redSquare && enPassant && piece === '')
            dispatch({type: 'REMOVE_PIECE_WITH_ENPASSANT'});

        dispatch({type: 'MOVE_PIECE', payload: {square: {row, column}}});
        dispatch({type: 'CHANGE_TURN'})
        dispatch({type: 'REMOVE_HIGHLIGHTED_SQUARES'});            
    }

    useEffect(() => {
        const currentSquare = {row, column};
        let isBlue = false;
        blue_squares.some((square) => {
            if(square.row === currentSquare.row && square.column === currentSquare.column){
                square.enpassant && dispatch({type: 'SET_ENPASSANT', payload: {square: {row, column}}})
                isBlue = true;
                return true;
            }           
            else 
                return false;
        });
        setBlueSquare(isBlue);
    }, [blue_squares])

    useEffect(() => {
        const currentSquare = {row, column};
        let isRed = false;
        red_squares.some((square) => {
            if(square.row === currentSquare.row && square.column === currentSquare.column){
                isRed = true;
                return true;
            }           
            else 
                return false;
        });
        setRedSquare(isRed);
    }, [red_squares])


    return(
        <div 
            className={styles.chess_board_square} 
            style={handleStyles()}
            onClick={handleClick}> 
                {piece === 'pawn' && <Pawn color={color} position={{row, column}}/>}
                {piece === 'queen' && <Queen color={color} position={{row, column}}/>}
                {piece === 'rook' && <Rook color={color} position={{row, column}} />}
                {piece === 'knight' && <Knight color={color} position={{row, column}} />}
                {piece === 'bishop' && <Bishop color={color} position={{row, column}} />}
                {piece === 'king' && <King color={color} position={{row, column}}/>}
        </div> 
    )
}

export default Squares;