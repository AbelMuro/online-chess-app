import { createAction, createReducer } from '@reduxjs/toolkit';

const displayPopupMessage = createAction('DISPLAY_POPUP_MESSAGE');
const resetPopupMessage = createAction('RESET_POPUP_MESSAGE');

const initialState = {
    message: ''
}

const PopUpBoxReducer = createReducer(initialState, (builder) => {
    builder 
        .addCase(displayPopupMessage, (state, action) => {
            state.message = action.payload.message;
        })
        .addCase(resetPopupMessage, (state) => {
            state.message = '';
        })
});

export default PopUpBoxReducer;