import React, {useEffect, memo} from 'react';
import {useSelector, useDispatch} from 'react-redux';

function SetPinnedPieces({row, column, color}){
    const board = useSelector(state => state.chess.board);     
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch({type: 'SET_PINNED_PIECES', payload: {square: {row, column, color}}})

        return () => {
            dispatch({type: 'CLEAR_PINNED_PIECES', payload: {square: {row, column, color}}})
        }
    }, [board])


    return(<></>)
}

export default memo(SetPinnedPieces);