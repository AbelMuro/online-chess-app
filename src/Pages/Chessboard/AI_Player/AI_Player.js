import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { ConvertMatrixToFen, UpdateMatrixWithAIMove } from './utils';
import {useSelector} from 'react-redux';

function AI_Player() {
    const board = useSelector(state => state.chess.board);
    const currentTurn = useSelector(state => state.chess.current_turn);

    const handleAImove = async () => {
        try{
            const response = await fetch('http://localhost:4000/ai_move', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(board)
            });

            if(response.status === 200){
                const boardUpdatedWithAImove = await response.json();
                console.log(boardUpdatedWithAImove);
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
        if(currentTurn === 'black'){
            handleAImove();
            console.log('fetch request made')
        }
            
    }, [board, currentTurn])

    return null
}

export default AI_Player;