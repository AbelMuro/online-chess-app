export const updateMatchInDatabase = async (chess, matchId) => {
    try{
        const response = await fetch(`https://world-class-chess-server.com/update_match/${matchId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({chess, matchId})
        })
        return response.text();
    }
    catch(error){
        const message = error.message;
        console.log(message);
        return Promise.reject(message);
    }
}