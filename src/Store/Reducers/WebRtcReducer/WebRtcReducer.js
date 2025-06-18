import { createAction, createReducer} from '@reduxjs/toolkit';

const connectionEstablished = createAction('CONNECTION_ESTABLISHED');
const setError = createAction('SET_ERROR');
const setRemoteMessage = createAction('SET_REMOTE_MESSAGE');
const setLocalMessage = createAction('SET_LOCAL_MESSAGE');
const setRemoteClientUsername = createAction('SET_REMOTE_CLIENT_USERNAME');
const reInitiateWebRTC = createAction('REINITIATE_WEBRTC');
const startConnection = createAction('START_CONNECTION');
const resetWebRTC = createAction('RESET_WEBRTC');

const initialState = {
    error: '',
    localMessage: '',
    remoteMessage: '',
    startConnection: false,
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
            console.log(state.reInitiateWebRTC);
            state.reInitiateWebRTC = !state.reInitiateWebRTC;
        })  
        .addCase(connectionEstablished, (state, action) => {
            state.connectionEstablished = action.payload.connection;
        })
        .addCase(setRemoteClientUsername, (state, action) => {
            state.remoteClientUsername = action.payload.username;
        })
        .addCase(startConnection, (state, action) => {
            state.startConnection = !state.startConnection;
        })
        .addCase(resetWebRTC, (state) => {
            state.error = initialState.error;
            state.localMessage = initialState.localMessage;
            state.remoteMessage = initialState.remoteMessage;
            state.startConnection = initialState.startConnection;
            state.reInitiateWebRTC = initialState.reInitiateWebRTC;
            state.connectionEstablished = initialState.connectionEstablished;
            state.remoteClientUsername = initialState.remoteClientUsername;
        })
});

export default WebRtcReducer;