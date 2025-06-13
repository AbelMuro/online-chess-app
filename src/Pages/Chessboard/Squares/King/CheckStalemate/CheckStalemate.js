import {useEffect, memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

function CheckStalemate({row, column, color}) {
    const dispatch = useDispatch();
    const movesAvailable = useSelector(state => state.chess.stalemate[`movesAvailableFor${color === 'white' ? 'White' : 'Black'}`])


    useEffect(() => {
        console.log('moves available', movesAvailable);
        dispatch({type: 'CHECK_STALEMATE', payload: {square: {row, column, color}, movesAvailable}})
    }, [movesAvailable])

    return null;
}

export default memo(CheckStalemate);