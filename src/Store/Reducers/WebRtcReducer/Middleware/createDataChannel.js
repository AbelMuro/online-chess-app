import { connectionManager } from "../WebRtcReducer.js";


const createDataChannel = (_, {dispatch, fulfillWithValue}) => {
    try{
        const peerConnection = connectionManager.peerConnection;      
        const dataChannel = peerConnection.createDataChannel('chat');   

        dataChannel.onopen = () => {
            console.log('Local data channel is open');
            dispatch({type: 'SET_CONNECTED', payload: {connected: true}}) 
        };
        dataChannel.onclose = () => {
            dispatch({type: 'CLOSE_DATA_CHANNEL'})
            dispatch({type: 'SET_CONNECTED', payload: {connected: false}})
        };  
        dataChannel.onerror = (error) => {
            const message = error.message;
            console.log('Local data channel experienced an error ', message);
            dispatch({type: 'SET_ERROR', payload: {message}});
            dispatch({type: 'SET_CONNECTED', payload: {connected: false}})
        };
        dataChannel.onmessage = (e) => {
            console.log('Received message from remote client', e.data)
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