import {useEffect, memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

function CheckStalemate({row, column, color}) {
    const dispatch = useDispatch();
    const movesAvailable = useSelector(state => state.chess[`movesAvailableFor${color === 'white' ? 'White' : 'Black'}`])
    console.log(movesAvailable);


    useEffect(() => {
        dispatch({type: 'CHECK_STALEMATE', payload: {square: {row, column, color}, movesAvailable}})
    }, [movesAvailable])

    return null;
}

export default memo(CheckStalemate);