import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

function AI_Player() {
    const board = useSelector(state => state.chess.board);
    const opponentColor = useSelector(state => state.settings.opponent_color);
    const currentTurn = useSelector(state => state.chess.current_turn);
    const difficulty = useSelector(state => state.settings.difficulty);
    const stop_moves = useSelector(state => state.chess.time_traveling.stop_moves);
    const dispatch = useDispatch();

    const handleAImove = async () => {
        try{
            const response = await fetch('world-class-chess-server.com/ai_move', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({board, AI_Color: opponentColor, difficulty})
            });

            if(response.status === 200){
                const bestmove = await response.json();
                dispatch({type: 'MOVE_PIECE_WITH_AI', payload: {bestmove, opponentColor}})
            }
            else if(response.status === 400){
                console.log('Failed to analyze position');
                dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Failed to analyze position.'}})
            }
            else {
                const message = await response.text();
                console.error('Internal Server error has occurred in this endpoint /ai_move', message);
                dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Internal Server Error has occurred, please try again later.'}})
            }
        }
        catch(error){
            const message = error.message;
            console.error('Server went offline in this endpoint /ai_move', message);
            dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Server is offline, please try again later.'}})
        }
    }

    useEffect(() => {
        if(stop_moves) return;

        if(currentTurn === opponentColor)
            handleAImove();
        
    }, [board, currentTurn])

    return null;
}

export default AI_Player;