import { createAction, createReducer } from '@reduxjs/toolkit';

const displayMessage = createAction('DISPLAY_MESSAGE');
const resetMessage = createAction('RESET_MESSAGE');

const initialState = {
    message: ''
}

const PopUpBoxReducer = createReducer(initialState, (builder) => {
    builder 
        .addCase(displayMessage, (state, action) => {
            state.message = action.payload.message;
        })
        .addCase(resetMessage, (state) => {
            state.message = '';
        })
});

export default PopUpBoxReducer;