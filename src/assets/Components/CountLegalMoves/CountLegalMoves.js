import {useEffect, memo} from 'react';
import {useSelector, useDispatch} from 'react-redux';

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