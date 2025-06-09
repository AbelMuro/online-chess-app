import {createAction, createReducer} from '@reduxjs/toolkit';

const setAccount = createAction('SET_ACCOUNT');

const initialState = {
    username: '',
}

const AccountReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setAccount, (state, action) => {
            state.username = action.payload.username;
        })  
})

export default AccountReducer;