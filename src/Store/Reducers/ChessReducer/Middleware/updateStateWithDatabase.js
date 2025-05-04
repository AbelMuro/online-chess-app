const updateStateWithDatabase = async (matchId, {dispatch}) => {
    try{
        const response = await fetch(`https://world-class-chess-server.com/get_match/${matchId}`, {
            method: 'GET'
        });

        if(response.status === 200){
            const chess = await response.json();
            const gameSettings = chess.game_settings;
            dispatch({type: 'SET_GAME_SETTINGS', payload: {
                user: gameSettings.user_color,
                opponent: gameSettings.opponent_color,
                playerOneUsername: gameSettings.playerOneUsername,
                playerTwoUsername: gameSettings.playerTwoUsername,
            }});
            return Promise.resolve({chess});
        }
        else{
            const message = await response.text();
            dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message}})    
            return Promise.reject(message);
        }
    }
    catch(error){
        const message = error.message;
        dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message}})  
        return Promise.reject(message);
    }
}

export default updateStateWithDatabase