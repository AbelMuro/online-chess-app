
const updateDatabaseWithState = async (matchId, {getState, dispatch, rejectWithValue}) => {
    try{
        const {chess, account} = getState();
        const localClientUsername = account.username;

        const response = await fetch(`https://world-class-chess-server.com/update_match`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({chess, matchId})
        })
        if(response.status === 200){
            const message = await response.text();
            dispatch({type: 'SEND_MESSAGE', payload: {message: {from: localClientUsername, action: 'move', data: {}}}})
            return Promise.resolve({message});        
        }
        else if(response.status === 404){
            const message = await response.text();
            dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Match was not found in the database'}})    
            return rejectWithValue({message, endpoint: '/update_match', type: 'internal'});
        }
        else{
            const message = await response.text();
            dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Internal Server Error has occurred, please try again later'}})    
            return rejectWithValue({message, endpoint: '/update_match', type: 'internal'})
        }
    }
    catch(error){
        const message = error.message;
        dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Server is offline, please try again later'}})  
        return rejectWithValue({message, endpoint: '/update_match', type: 'offline'});
    }
}

export default updateDatabaseWithState;