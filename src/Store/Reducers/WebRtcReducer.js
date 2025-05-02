import { createAction, createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import {initiatePeerConnection} from '../Middleware/Middleware.js';

const initiateWebRTC = createAsyncThunk('initiateWebRTC', initiatePeerConnection);
const setDataChannel = createAction('SET_DATA_CHANNEL');
const setMessage = createAction('SET_MESSAGE');
const setError = createAction('SET_ERROR');

const initialState = {
    peerConnection: null,
    signalingServer: null,
    dataChannel: null,
    loading: false,
    error: null,
    message: null,
    dataChannel: null,
}

/* 
    this is where i left off, i just need to test out this reducer
*/


const messageReducer = createReducer(initialState, (builder) => {
    builder 
        .addCase(initiateWebRTC.fulfilled, (state, action) => {
            state.peerConnection = action.payload.peerConnection;
            state.signalingServer = action.payload.signalingServer;
            console.log('Peer connection has been established')
        })
        .addCase(initiateWebRTC.rejected, (state, action) => {
            state.error = action.payload;
            console.log('Peer connection could not be established');
        })
        .addCase(setDataChannel, (state, action) => {
            const remoteClientUsername = action.payload.remoteClientUsername;
            state.dataChannel = state.peerConnection.createDataChannel('chat');            
            state.dataChannel.onopen = async () => {
                console.log('data channel is open')
                const offer = await state.peerConnection.createOffer()
                await state.peerConnection.setLocalDescription(offer);
                state.signalingServer.send(JSON.stringify({ 
                    type: 'offer', 
                    offer: {sdp: offer.sdp, type: offer.type}, 
                    username: remoteClientUsername, 
                }))  
            };
            state.dataChannel.onclose = () => {
                console.log('data channel is closed')
                state.dataChannel = null;
            };  
            state.dataChannel.onerror = (error) => {
                console.log('data channel experienced an error ', error);
                state.dataChannel = null;
            };
            state.dataChannel.onmessage = (e) => {
                console.log('Received message from remote client', e.data)
                const data = JSON.parse(e.data);
                const message = data.message;
                state.message = message;
            }; 
        })
        .addCase(setMessage, (state, action) => {
            state.message = action.payload.message;
            console.log('Received message from remote client')
        })
        .addCase(setError, (state, action) => {
            state.error = action.payload.error;
            console.log('Error has occured');
        })
});

export default messageReducer;