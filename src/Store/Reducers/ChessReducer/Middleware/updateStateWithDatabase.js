const updateStateWithDatabase = async (matchId, {getState, dispatch}) => {
    try{
        const account = getState();
        //const localClientUsername = account.username;             //the problem is that i cant access the account reducer from here

        const response = await fetch(`https://world-class-chess-server.com/get_match/${matchId}`, {
            method: 'GET'
        });

        if(response.status === 200){
            const chess = await response.json();
            const gameSettings = chess.game_settings;
            const playerOne = gameSettings.player_one;
            const playerTwo = gameSettings.player_two;
            const playerOneColor = playerOne.color;
            const playerTwoColor = playerTwo.color;

            /* 

            dispatch({type: 'SET_GAME_SETTINGS', payload: {
                user: localClientUsername === playerOne.username ? playerOneColor : playerTwoColor,
                opponent: localClientUsername === playerOne.username ? playerTwoColor : playerOneColor,
                playerOneUsername: playerOne.username,
                playerTwoUsername: playerTwo.username,
            }});            
            
            */

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