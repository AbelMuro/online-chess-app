import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

function AI_Player() {
    const board = useSelector(state => state.chess.board);
    const currentTurn = useSelector(state => state.chess.current_turn);
    const dispatch = useDispatch();

    const handleAImove = async () => {

        try{
            const response = await fetch('http://localhost:4000/ai_move', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({board, AI_Color: 'black'})
            });

            if(response.status === 200){
                const bestmove = await response.json();
                dispatch({type: 'MOVE_PIECE_WITH_AI', payload: {bestmove}})
                dispatch({type: 'CHANGE_TURN'});
            }
            else if(response.status === 400){
                console.log('Failed to analyze position');
                alert('Failed to analyze position');
            }
            else {
                const message = await response.text();
                console.log(message);
                alert('Internal Server error has occurred, please try again later')
            }
        }
        catch(error){
            const message = error.message;
            console.log(message);
            alert('Server is offline, please try again later');
        }
    }

    useEffect(() => {
        return;
        if(currentTurn === 'black')
            handleAImove();
        
    }, [board, currentTurn])

    return (
        <button onClick={handleAImove}>
            Make AI move
        </button>
    )
}

export default AI_Player;