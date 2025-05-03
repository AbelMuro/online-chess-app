import {createAction, createReducer} from '@reduxjs/toolkit';

const setAccount = createAction('SET_ACCOUNT');

const initialState = {
    username: '',
    imageURL: ''
}

const AccountReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setAccount, (state, action) => {
            state.username = action.payload.username;
            state.imageURL = action.payload.imageURL
        })  
})

export default AccountReducer;