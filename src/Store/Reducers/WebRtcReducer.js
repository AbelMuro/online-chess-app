import { createAction, createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import {initiatePeerConnection, createDataChannel, createOffer} from '../Middleware/Middleware.js';

export const initiateWebRTC = createAsyncThunk('INITIATE_WEBRTC', initiatePeerConnection);
export const createLocalDataChannel = createAsyncThunk('CREATE_LOCAL_DATA_CHANNEL', createDataChannel);
export const sendOffer = createAsyncThunk('CREATE_OFFER', createOffer)
const setLocalDataChannel = createAction('SET_DATA_CHANNEL');
const closeLocalDataChannel = createAction('CLOSE_DATA_CHANNEL');
const setMessage = createAction('SET_MESSAGE');
const sendMessage = createAction('SEND_MESSAGE');
const setError = createAction('SET_ERROR');

const initialState = {
    peerConnection: {
        connected: false,
        iceCandidates: []
    },
    signalingServer: null,
    dataChannel: null,
    loading: false,
    error: null,
    message: null,
}

/* 
    this is where i left off, i need to find a way to save a reference to the following objects

    new RTCPeerConnection()
    new Websocket()

    these are non-serializable, so i cant store them in the redux store
*/


const webRtcReducer = createReducer(initialState, (builder) => {
    builder 
        .addCase(initiateWebRTC.fulfilled, (state, action) => {
            state.peerConnection = action.payload.peerConnection;
            state.signalingServer = action.payload.signalingServer;
            console.log('Peer connection has been established')
        })
        .addCase(initiateWebRTC.rejected, (state, action) => {
            state.error = action.payload;
            console.log('Peer connection could not be established ', state.error);
        })
        .addCase(createLocalDataChannel.fulfilled, (state, action) => {
            state.dataChannel = action.payload.dataChannel;
            console.log('local data channel is open');
        })
        .addCase(createLocalDataChannel.rejected, (state, action) => {
            state.error = action.payload;
            console.log('local data channel could not be opened ', state.error);
        })
        .addCase(sendOffer.fulfilled, (state, action) => {
            const message = action.payload;
            console.log(message);
        })
        .addCase(sendOffer.rejected, (state, action) => {
            const message = action.payload;
            console.log('Offer could not be sent to remote client ', message)
        })
        .addCase(setMessage, (state, action) => {
            state.message = action.payload.message;
            console.log('Received message from remote client')
        })
        .addCase(sendMessage, (state, action) => {
            const dataChannel = state.dataChannel;
            const message = action.payload.message;

            if(dataChannel?.readyState === 'open')
                dataChannel?.send(JSON.stringify(message));
        })
        .addCase(setError, (state, action) => {
            state.error = action.payload.error;
            console.log('Error has occured ', state.error);
        })
        .addCase(setLocalDataChannel, (state, action) => {
            state.dataChannel = action.payload.dataChannel;
            console.log("Remote data channel is open!");
        })
        .addCase(closeLocalDataChannel, (state, action) => {
            state.dataChannel = null;
            console.log("Remote data channel closed");
        })
});

export default webRtcReducer;