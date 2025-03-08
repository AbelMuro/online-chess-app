import {memo, useEffect} from 'react';
import {useSelector} from 'react-redux';

function UpdateMatchInDatabase({gameId}) {
    const board = useSelector(state => state.chess.board);
    const currentTurn = useSelector(state => state.chess.current_turn);


    useEffect(() => {
        const updateMatch = async () => {
            try{
                const response = await fetch('http://localhost:4000/update_match', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({board, currentTurn, gameId})
                })
                if(response.status === 200){
                    const result = await response.text();
                    console.log(result);
                }
                else{
                    const result = await response.text();
                    console.log(result);
                    alert('Internal Server Error has occured, please try again later');
                }

            }
            catch(error){
                const message = error.message;
                console.log(message);
                alert('Server is offline, please try again later');
            }
        }

        updateMatch();
    }, [board, currentTurn])


    return null;
}

export default memo(UpdateMatchInDatabase);