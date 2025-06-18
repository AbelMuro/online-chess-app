import { createAction, createReducer} from '@reduxjs/toolkit';

const connectionEstablished = createAction('CONNECTION_ESTABLISHED');
const setError = createAction('SET_ERROR');
const setRemoteMessage = createAction('SET_REMOTE_MESSAGE');
const setLocalMessage = createAction('SET_LOCAL_MESSAGE');
const setRemoteClientUsername = createAction('SET_REMOTE_CLIENT_USERNAME');
const reInitiateWebRTC = createAction('REINITIATE_WEBRTC');
const startConnection = createAction('START_CONNECTION');

const initialState = {
    error: '',
    localMessage: '',
    remoteMessage: '',
    startConnection: null,
    reInitiateWebRTC: false,
    connectionEstablished: false,
    remoteClientUsername: '',
}

const WebRtcReducer = createReducer(initialState, (builder) => {
    builder 
        .addCase(setLocalMessage, (state, action) => {
            state.localMessage = action.payload.message
        })
        .addCase(setRemoteMessage, (state, action) => {
            state.remoteMessage = action.payload.message;
        })
        .addCase(setError, (state, action) => {
            state.error = action.payload.error;
        })
        .addCase(reInitiateWebRTC, (state) => {
            state.reInitiateWebRTC = !state.reInitiateWebRTC;
        })  
        .addCase(connectionEstablished, (state, action) => {
            state.connectionEstablished = action.payload.connectionEstablished;
        })
        .addCase(setRemoteClientUsername, (state, action) => {
            state.remoteClientUsername = action.payload.username;
        })
        .addCase(startConnection, (state, action) => {
            state.startConnection = !state.startConnection;
        })
});

export default WebRtcReducer;