import { createAction, createReducer} from '@reduxjs/toolkit';

const connectionEstablished = createAction('CONNECTION_ESTABLISHED');
const setError = createAction('SET_ERROR');
const setRemoteMessage = createAction('SET_REMOTE_MESSAGE');
const setLocalMessage = createAction('SET_LOCAL_MESSAGE');
const setRemoteClientUsername = createAction('SET_REMOTE_CLIENT_USERNAME');
const reInitiateConnection = createAction('REINITIATE_CONNECTION');

const initialState = {
    error: '',
    localMessage: '',
    remoteMessage: '',
    reInitiateConnection: false,
    connectionEstablished: false,
    remoteClientUsername: '',
}

const WebRtcReducer = createReducer(initialState, (builder) => {
    builder 
        .addCase(setLocalMessage, (state, action) => {
            state.localMessage = action.payload.message
        })
        .addCase(setError, (state, action) => {
            state.error = action.payload.error;
        })
        .addCase(setRemoteMessage, (state, action) => {
            state.remoteMessage = action.payload.message;
        })
        .addCase(reInitiateConnection, (state) => {
            state.reInitiateConnection = !state.reInitiateConnection;
        })  
        .addCase(connectionEstablished, (state, action) => {
            state.connectionEstablished = action.payload.connectionEstablished;
        })
        .addCase(setRemoteClientUsername, (state, action) => {
            state.remoteClientUsername = action.payload.username;
        })
});

export default WebRtcReducer;