
const updateStateWithDatabase = async (matchId, {dispatch, getState, rejectWithValue}) => {
    try{
        const {account} = getState();
        const localClientUsername = account.username;

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

            dispatch({type: 'SET_GAME_SETTINGS', payload: {
                user: localClientUsername === playerOne.username ? playerOneColor : playerTwoColor,
                opponent: localClientUsername === playerOne.username ? playerTwoColor : playerOneColor,
                playerOne: playerOne,
                playerTwo: playerTwo,
            }});            
            return Promise.resolve({chess});
        }
        else{
            const message = await response.text();
            dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Internal Server Error has occurred, please try again later'}})    
            return rejectWithValue({message, endpoint: '/get_match', type: 'internal'});
        }
    }
    catch(error){
        const message = error.message;
        dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Server is offline, please try again later'}})  
        return rejectWithValue({message, endpoint: '/get_match', type: 'offline'});
    }
}

export default updateStateWithDatabase