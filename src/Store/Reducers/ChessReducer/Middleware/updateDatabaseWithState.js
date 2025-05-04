const updateDatabaseWithState = async (matchId, {getState, dispatch}) => {
    try{
        const chess = getState();
        const account = getState();
        const localClientUsername = account.username;

        const response = await fetch(`https://world-class-chess-server.com/update_match/${matchId}`, {
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
        else{
            const message = await response.text();
            dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message}})    
            return Promise.reject({message})
        }
    }
    catch(error){
        const message = error.message;
        dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message}})  
        return Promise.reject({message});
    }
}

export default updateDatabaseWithState;