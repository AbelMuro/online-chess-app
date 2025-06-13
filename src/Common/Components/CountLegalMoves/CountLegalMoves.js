import {useEffect, memo} from 'react';
import {useSelector, useDispatch} from 'react-redux';

function CountLegalMoves({row, column, color, pieceId}){
    const dispatch = useDispatch();
    const board = useSelector(state => state.chess.board);


    useEffect(() => {
        dispatch({type: 'COUNT_LEGAL_MOVES', payload: {square: {row, column, color}}});
    }, [board])

    useEffect(() => {
        return () => {
            console.log('clean up moves')
            dispatch({type: 'RESET_LEGAL_MOVES', payload: {pieceId, color}});
        }
    }, [])

    

    return null;
}

export default memo(CountLegalMoves);