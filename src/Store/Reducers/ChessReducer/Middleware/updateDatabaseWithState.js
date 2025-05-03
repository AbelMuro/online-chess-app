const updateDatabaseWithState = async (matchId, {getState, dispatch}) => {
    try{
        const chess = getState();
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

export default updateDatabaseWithState;