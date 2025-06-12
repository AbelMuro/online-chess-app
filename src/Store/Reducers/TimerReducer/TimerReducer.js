import {createAction, createReducer} from '@reduxjs/toolkit';

const updateTimer = createAction('UPDATE_TIMER')
const resetTimer = createAction('RESET_TIMER');

const initialState = {
    seconds: 60,
    stop: false,
}

const timerReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(updateTimer, (state) => {
            if(state.seconds > 0)
                state.seconds--;
        })
        .addCase(resetTimer, (state, action) => {
            state.seconds = action.payload.seconds;
        })
})

export default timerReducer;