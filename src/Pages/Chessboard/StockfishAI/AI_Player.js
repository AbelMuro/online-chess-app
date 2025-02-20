import React from 'react';
import {useDispatch} from 'react-redux';
import StockfishEngine from './StockfishEngine.js';
import { ConvertMatrixToFen, UpdateMatrixWithAIMove } from './utils';
import {useSelector} from 'react-redux';

function AI_Player() {
    const dispatch = useDispatch();
    const board = useSelector(state => state.chess.board);
    const currentTurn = useSelector(state => state.chess.current_turn);
    const fen = ConvertMatrixToFen(board);

    const handleAIMove = (move) => {
        const newMatrix = UpdateMatrixWithAIMove(board, move);
        dispatch({type: 'MOVE_PIECE_WITH_AI', payload: {board: newMatrix}})
    }

    return(<StockfishEngine fen={fen} onMove={handleAIMove}/>)
}

export default AI_Player;