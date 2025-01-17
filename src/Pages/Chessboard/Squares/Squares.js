import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Pawn from './Pawn';
import Rook from './Rook';
import Knight from './Knight';
import Bishop from './Bishop';
import Queen from './Queen';
import King from './King';
import * as styles from './styles.module.css'


//The Squares components is responsible for displaying the red or blue squares; 
// red means that the square has a piece that can be taken
// blue means that the square is a legal square that a certain piece can move into (check redux store for the pieceToBeMoved property)
// the child components of this component are the actual pieces, they are responsible for implementing the rules for 'moving' and 'taking' for each piece

function Squares({piece, color, row, column}) {
    const [blueSquare, setBlueSquare] = useState(false);
    const [redSquare, setRedSquare] = useState(false);
    const blue_squares = useSelector(state => state.chess.blue_squares);    
    const red_squares = useSelector(state => state.chess.red_squares);
    const selected_square = useSelector(state => state.chess.pieceToBeMoved?.square);
    const enPassant = useSelector(state => state.chess.en_passant);
    const dispatch = useDispatch();

    const handleStyles = () => {
        if(selected_square && selected_square.row === row && selected_square.column === column){
            return {backgroundColor: 'rgba(0, 0, 230, 0.6)', cursor: 'pointer'}
        }
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
            dispatch({type: 'MOVE_PIECE_WITH_ENPASSANT'});
        else
            dispatch({type: 'MOVE_PIECE', payload: {square: {row, column}}});
        dispatch({type: 'CHANGE_TURN'})          
    }

    useEffect(() => {
        const currentSquare = {row, column};
        let isBlue = false;
        blue_squares.some((square) => {
            if(square.row === currentSquare.row && square.column === currentSquare.column){
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
                {piece === 'pawn' && <Pawn color={color} row={row} column={column} />}
                {piece === 'queen' && <Queen color={color} row={row} column={column}/>}
                {piece === 'rook' && <Rook color={color} row={row} column={column}/>}
                {piece === 'knight' && <Knight color={color} row={row} column={column}/>}
                {piece === 'bishop' && <Bishop color={color} row={row} column={column} />}
                {piece === 'king' && <King color={color} row={row} column={column}/>}
        </div> 
    )
}

export default Squares;