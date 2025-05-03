import {createAction, createReducer} from '@reduxjs/toolkit';

const updateAccount = createAction('UPDATE_ACCOUNT');

const initialState = {
    username: '',
    profileImageId: ''
}

const AccountReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(updateAccount, (state, action) => {
            state.username = action.payload.username;
            state.profileImageId = action.payload.username
        })  
})

export default AccountReducer;