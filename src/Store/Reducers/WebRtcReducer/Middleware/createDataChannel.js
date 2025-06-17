import { connectionManager } from "../WebRtcReducer.js";

const createDataChannel = (_, {dispatch, fulfillWithValue}) => {
    try{
        const peerConnection = connectionManager.peerConnection;      
        const dataChannel = peerConnection.createDataChannel('chat');   

        dataChannel.onopen = () => {
            dispatch({type: 'SET_CONNECTED', payload: {connected: true}}) 
        };
        dataChannel.onerror = (error) => {
            dispatch({type: 'SET_ERROR', payload: {error, message: 'data channel experienced an error'}});
        };
        dataChannel.onclose = () => {
            dispatch({type: 'CANCEL_CONNECTION'});
        }
        dataChannel.onmessage = (e) => {
            const data = JSON.parse(e.data);
            const message = data.message;
            dispatch({type: 'SET_MESSAGE', payload: {message}})
        };      
        
        return fulfillWithValue({dataChannel});
        
    }
    catch(error){
        const message = error.message;
        return Promise.reject({message});
    }
}

export default createDataChannel;