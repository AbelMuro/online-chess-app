import {memo, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

function UpdateMatchInDatabase({matchId}) {
    const board = useSelector(state => state.chess.board);
    const currentTurn = useSelector(state => state.chess.players.current_turn);
    const blackPiecesTaken = useSelector(state => state.chess.moves.black_pieces_taken);
    const whitePiecesTaken = useSelector(state => state.chess.moves.white_pieces_taken);
    const moves = useSelector(state => state.chess.moves.all);
    const hasKingBeenMoved = useSelector(state => state.chess.castleling.has_king_been_moved);
    const hasRooksBeenMoved = useSelector(state => state.chess.castleling.has_rooks_been_moved);
    const navigate = useNavigate();

    useEffect(() => {
        const updateMatch = async () => {
            try{
                const response = await fetch('http://localhost:8080/update_match', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({board, currentTurn, matchId, hasKingBeenMoved, hasRooksBeenMoved, blackPiecesTaken, whitePiecesTaken, moves})
                })
                if(response.status === 200){
                    const result = await response.text();
                    console.log(result);
                }
                else if(response.status === 404){
                    const result = await response.text();
                    console.log(result);
                    navigate('/menu');
                }
                else{
                    const result = await response.text();
                    console.log(result);
                    dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Internal Server Error has occurred, please try again later.'}})
                }
            }
            catch(error){
                const message = error.message;
                console.log(message);
                dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Server is offline, please try again later'}})
            }
        }

        updateMatch();
    }, [board, currentTurn, hasKingBeenMoved, hasRooksBeenMoved, blackPiecesTaken, whitePiecesTaken, moves])


    return null;
}

export default memo(UpdateMatchInDatabase);