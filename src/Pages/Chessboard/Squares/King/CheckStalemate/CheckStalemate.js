import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

function CheckStalemate({row, column, color}) {
    const dispatch = useDispatch();
    const availableMoves = useSelector(state => state.chess[`movesAvailableFor${color === 'white' ? 'White' : 'Black'}`])

    useEffect(() => {
        dispatch({type: 'CHECK_STALEMATE', payload: {square: {row, column, color}}})
    }, [availableMoves])

    return(<></>)
}

export default CheckStalemate;