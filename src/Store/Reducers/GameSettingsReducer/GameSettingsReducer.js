import {createAction, createReducer} from '@reduxjs/toolkit';

const setPlayers = createAction('SET_GAME_SETTINGS');

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
})

export default GameSettingsReducer;