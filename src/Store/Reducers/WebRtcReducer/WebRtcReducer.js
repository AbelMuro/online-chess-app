import { createAction, createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import {initiatePeerConnection, createDataChannel, createOffer} from './Middleware';

export const initiateWebRTC = createAsyncThunk('INITIATE_WEBRTC', initiatePeerConnection);
export const createLocalDataChannel = createAsyncThunk('CREATE_LOCAL_DATA_CHANNEL', createDataChannel);
export const sendOffer = createAsyncThunk('CREATE_OFFER', createOffer)
const setLocalDataChannel = createAction('SET_DATA_CHANNEL');
const closeLocalDataChannel = createAction('CLOSE_DATA_CHANNEL');
const setMessage = createAction('SET_MESSAGE');
const sendMessage = createAction('SEND_MESSAGE');
const cancelConnection = createAction('CANCEL_CONNECTION')
const setError = createAction('SET_ERROR');

//non-serializable values
export const connectionManager = {
    peerConnection: null,
    signalingServer: null,
    dataChannel: null
}

//serializable values
const initialState = {
    error: null,
    message: null,
}


const WebRtcReducer = createReducer(initialState, (builder) => {
    builder 
        .addCase(initiateWebRTC.fulfilled, (state, action) => {
            connectionManager.peerConnection = action.payload.peerConnection;
            connectionManager.signalingServer = action.payload.signalingServer;
            console.log('Peer connection has been established')
        })
        .addCase(initiateWebRTC.pending, (state, action) => {
            console.log('waiting for web rtc...')
        })  
        .addCase(initiateWebRTC.rejected, (state, action) => {
            state.error = action.error.message;
            console.log('Peer connection could not be established ', state.error);
        })
        .addCase(createLocalDataChannel.fulfilled, (state, action) => {
            connectionManager.dataChannel = action.payload.dataChannel;
            console.log('Local data channel has been created');
        })
        .addCase(createLocalDataChannel.pending, (state, action) => {
            console.log('waiting for data channel...')
        })
        .addCase(createLocalDataChannel.rejected, (state, action) => {
            state.error = action.error.message;
            console.log('Local data channel could not be opened ', state.error);
        })
        .addCase(sendOffer.fulfilled, (state, action) => {
            const message = action.payload;
            console.log(message);
        })
        .addCase(sendOffer.pending, (state, action) => {
            console.log('waiting for offer...');
        })
        .addCase(sendOffer.rejected, (state, action) => {
            state.error = action.error.message;
            console.log('Offer could not be sent to remote client ', state.error)
        })
        .addCase(setMessage, (state, action) => {
            state.message = action.payload.message;
            console.log('Received message from remote client')
        })
        .addCase(sendMessage, (state, action) => {
            const dataChannel = connectionManager.dataChannel;
            const message = action.payload.message;

            if(dataChannel?.readyState === 'open')
                dataChannel?.send(JSON.stringify(message));
        })
        .addCase(setLocalDataChannel, (state, action) => {
            connectionManager.dataChannel = action.payload.dataChannel;
            console.log("Remote data channel is open!");
        })
        .addCase(closeLocalDataChannel, (state, action) => {
            connectionManager.dataChannel = null;
            console.log("Remote data channel closed");
        })
        .addCase(cancelConnection, () => {
            connectionManager.dataChannel?.close();
            console.log('Local data channel closed');    
        })
        .addCase(setError, (state, action) => {
            state.error = action.payload.message;
            console.log('Error has occured ', state.error);
        })
});

export default WebRtcReducer;