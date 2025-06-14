import {createAction, createReducer} from '@reduxjs/toolkit';

const setPlayers = createAction('SET_GAME_SETTINGS');
const resetState = createAction('RESET_STATE');

const initialState = {
    user_color: '',
    opponent_color: '',
    player_one: {username: '', color: ''},
    player_two: {username: '', color: ''},
    difficulty: ''   
}

const GameSettingsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setPlayers, (state, action) => {
            state.user_color = action.payload.user; 
            state.opponent_color = action.payload.opponent;
            state.player_one = action.payload.playerOne || '';
            state.player_two = action.payload.playerTwo || '';
            state.difficulty = action.payload.difficulty || '';
        })
        .addCase(resetState, (state) => {
            state.user_color = initialState.user_color;
            state.opponent_color = initialState.opponent_color;
            state.player_one = initialState.player_one;
            state.player_two = initialState.player_two;
            state.difficulty = initialState.difficulty;
        })
})

export default GameSettingsReducer;