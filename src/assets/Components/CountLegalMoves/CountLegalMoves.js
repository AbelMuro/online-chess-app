import {useEffect, memo} from 'react';
import {useSelector, useDispatch} from 'react-redux';

//i found the bug here,
//it turns out that the unmount function is removing all the available moves for both white and black
//i will need to find a way to remove the available moves for each piece but without canceling the 'reset state' action
function CountLegalMoves({row, column, color, pieceId}){
    const dispatch = useDispatch();
    const square = useSelector(state => state.chess.board[row][column]);

    useEffect(() => {
        dispatch({type: 'COUNT_LEGAL_MOVES', payload: {square: {row, column, color}}});
        
        return () => {
            dispatch({type: 'RESET_LEGAL_MOVES', payload: {pieceId, color}});
        }

    }, [square])
    

    return null;
}

export default memo(CountLegalMoves);