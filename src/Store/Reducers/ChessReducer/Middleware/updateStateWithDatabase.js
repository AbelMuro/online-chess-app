const updateStateWithDatabase = async (matchId, {getState, dispatch}) => {
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

export default updateStateWithDatabase