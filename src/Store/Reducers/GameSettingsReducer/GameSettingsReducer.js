import {createAction, createReducer} from '@reduxjs/toolkit';

const setPlayers = createAction('SET_GAME_SETTINGS');

const initialState = {
    user_color: '',
    opponent_color: '',
    player_one_username: '',
    player_two_username: '',
    difficulty: ''   
}

const GameSettingsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setPlayers, (state, action) => {
            state.user_color = action.payload.user;
            state.opponent_color = action.payload.opponent;
            state.player_one_username = action.payload.playerOneUsername || '';
            state.player_two_username = action.payload.playerTwoUsername || '';
            state.difficulty = action.payload.difficulty || '';
        })
})

export default GameSettingsReducer;