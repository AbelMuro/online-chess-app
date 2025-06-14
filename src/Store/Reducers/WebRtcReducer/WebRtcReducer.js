import { createAction, createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import {initiatePeerConnection, createDataChannel, createOffer} from './Middleware';

export const initiateWebRTC = createAsyncThunk('INITIATE_WEBRTC', initiatePeerConnection);
export const createLocalDataChannel = createAsyncThunk('CREATE_LOCAL_DATA_CHANNEL', createDataChannel);
export const sendOffer = createAsyncThunk('CREATE_OFFER', createOffer)

const setDataChannel = createAction('SET_DATA_CHANNEL');
const closeDataChannel = createAction('CLOSE_DATA_CHANNEL');
const setMessage = createAction('SET_MESSAGE');
const sendMessage = createAction('SEND_MESSAGE');
const clearMessage = createAction('CLEAR_MESSAGE');

const setConnected = createAction('SET_CONNECTED');
const cancelConnection = createAction('CANCEL_CONNECTION')

const setError = createAction('SET_ERROR');
const setRemoteClient = createAction('SET_REMOTE_CLIENT');

//non-serializable values
export const connectionManager = {
    peerConnection: null,
    signalingServer: null,
    dataChannel: null,
    cancelDataChannel: function() {
        if(this.dataChannel?.readyState === 'open')
            this.dataChannel.close();
    },
    cancelPeerConnection: function() {
        this.peerConnection?.close();   
    },
    cancelSignalingServer: function() {
        if(this.signalingServer?.readyState === WebSocket.OPEN)
            this.signalingServer.close();   
    },
    resetPeerConnection: function() {
        this.peerConnection = null;
    },
    resetSignalingServer: function() {
        this.signalingServer = null;
    },
    resetDataChannel: function() {
        this.dataChannel = null;
    }
}

//serializable values
const initialState = {
    error: '',
    message: '',
    connected: false,
    remoteClientUsername: '',
}

const WebRtcReducer = createReducer(initialState, (builder) => {
    builder 
        .addCase(initiateWebRTC.fulfilled, (state, action) => {
            connectionManager.peerConnection = action.payload.peerConnection;
            connectionManager.signalingServer = action.payload.signalingServer;
            console.log('Peer connection has been established');
        })
        .addCase(initiateWebRTC.pending, (state, action) => {
            console.log('Waiting to initialize WebRTC...');
        })  
        .addCase(initiateWebRTC.rejected, (state, action) => {
            state.error = action.error.message;
            console.log('Peer connection could not be established ', state.error);
        })
        .addCase(createLocalDataChannel.fulfilled, (state, action) => {
            connectionManager.dataChannel = action.payload.dataChannel;
            console.log('Data channel has been created');
        })
        .addCase(createLocalDataChannel.pending, (state, action) => {
            console.log('waiting for data channel to be created...');
        })
        .addCase(createLocalDataChannel.rejected, (state, action) => {
            state.error = action.error.message;
            console.log('Data channel could not be opened ', state.error);
        })
        .addCase(sendOffer.fulfilled, (state, action) => {
            const message = action.payload;
            console.log(message);
        })
        .addCase(sendOffer.pending, () => {
            console.log('waiting for offer to be created and sent...');
        })
        .addCase(sendOffer.rejected, (state, action) => {
            state.error = action.error.message;
            console.log('Offer could not be sent to remote client ', state.error)
        })
        .addCase(setRemoteClient, (state, action) => {
            state.remoteClientUsername = action.payload.username;
        })
        .addCase(setMessage, (state, action) => {
            state.message = action.payload.message;
            console.log('Received message from remote client')
        })
        .addCase(sendMessage, (state, action) => {
            const dataChannel = connectionManager.dataChannel;
            const message = action.payload;

            if(dataChannel?.readyState === 'open'){
                dataChannel?.send(JSON.stringify(message));
                console.log('Message has been sent')
            }
        })
        .addCase(setDataChannel, (state, action) => {
            connectionManager.dataChannel = action.payload.dataChannel;
            console.log("Data channel is open!");
        })
        .addCase(closeDataChannel, (state) => {
            state.message = '';
            state.connected = false;
            state.remoteClientUsername = '';
            if(connectionManager.dataChannel)
                connectionManager.dataChannel.onclose = () => {}
            connectionManager.cancelDataChannel();
            console.log('Data channel is closed');
        })
        .addCase(cancelConnection, (state) => {
            state.message = '';
            state.connected = false;
            state.remoteClientUsername = '';
            if(connectionManager.dataChannel)
                connectionManager.dataChannel.onclose = () => {
                    connectionManager.cancelPeerConnection();
                    connectionManager.resetPeerConnection();
                    connectionManager.cancelSignalingServer();
                    connectionManager.resetSignalingServer();
                }; 
            connectionManager.cancelDataChannel();   
            console.log('Connection has been cancelled'); 
        })           
        .addCase(setConnected, (state, action) => {
            state.connected = action.payload.connected;
        })
        .addCase(setError, (state, action) => {
            if(connectionManager.dataChannel)
                connectionManager.dataChannel.onclose = () => {};
            connectionManager.cancelDataChannel();  
            state.message = '';
            state.connected = false;
            state.remoteClientUsername = '';
            state.error = action.payload.error;
            const message = action.payload.message;
            console.error(message, state.error);
        })
        .addCase(clearMessage, (state) => {
            state.message = '';
        })
});

export default WebRtcReducer;