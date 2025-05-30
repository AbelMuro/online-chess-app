/* 
    this is where i left off, im succeded in creating a match with the local client and remote client
    the problem is assigning the colors to the players (white, black)

    i need to get the localClientUsername in a useEffect() and make a fetch request that updates the
    match with the game settings,

*/

const updateStateWithDatabase = async (matchId, {dispatch, getState}) => {
    try{
        const {account} = getState();
        const localClientUsername = account.username;

        const response = await fetch(`http://localhost:8080/get_match/${matchId}`, {
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
            return Promise.reject({message, endpoint: '/get_match', type: 'internal'});
        }
    }
    catch(error){
        const message = error.message;
        dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Server is offline, please try again later'}})  
        return Promise.reject({message, endpoint: '/get_match', type: 'offline'});
    }
}

export default updateStateWithDatabase