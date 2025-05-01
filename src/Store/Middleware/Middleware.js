export const updateDatabaseWithState = async (matchId, {getState, dispatch}) => {
    try{
        const state = getState();
        const chess = state.chess;

        const response = await fetch(`https://world-class-chess-server.com/update_match/${matchId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({chess, matchId})
        })
        const message = await response.text();
        return Promise.resolve(message);
    }
    catch(error){
        const message = error.message;
        console.log(message);
        return Promise.reject(message);
    }
}

export const updateStateWithDatabase = async (matchId, {getState, dispatch}) => {
    try{
        const response = await fetch(`https://world-class-chess-server.com/get_match/${matchId}`, {
            method: 'GET'
        });

        if(response.status === 200){
            const chess = await response.json();
            return Promise.resolve({chess});
        }
        else{
            const message = await response.text();
            return Promise.reject(message);
        }
    }
    catch(error){
        const message = error.message;
        console.log(message);
        return Promise.reject(message);
    }
}