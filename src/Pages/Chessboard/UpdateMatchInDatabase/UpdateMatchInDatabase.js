import {memo, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

function UpdateMatchInDatabase({matchId}) {
    const chess = useSelector(state => state.chess)
    const navigate = useNavigate();

    useEffect(() => {
        const updateMatch = async () => {
            try{
                const response = await fetch('https://world-class-chess-server.com/update_match', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({chess})
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
    }, [chess])


    return null;
}

export default memo(UpdateMatchInDatabase);