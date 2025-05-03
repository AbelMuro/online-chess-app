import { connectionManager } from "../WebRtcReducer.js";


const createDataChannel = (_, {dispatch}) => {
    try{
        const peerConnection = connectionManager.peerConnection;      

        return new Promise((resolve, reject) => {
            const dataChannel = peerConnection.createDataChannel('chat');    
            console.log('inside the promise'); 
            dataChannel.onopen = () => {
                resolve({dataChannel});  
            };
            dataChannel.onclose = () => {
                dispatch({type: 'CLOSE_DATA_CHANNEL'})
            };  
            dataChannel.onerror = (error) => {
                const message = error.message;
                console.log('Local data channel experienced an error ', message);
                dispatch({type: 'SET_ERROR', payload: {message }});
                reject({message});
            };
            dataChannel.onmessage = (e) => {
                console.log('Received message from remote client', e.data)
                const data = JSON.parse(e.data);
                const message = data.message;
                dispatch({type: 'SET_MESSAGE', payload: {message}})
            };             
        })
    }
    catch(error){
        const message = error.message;
        return Promise.reject({message});
    }
}

export default createDataChannel;