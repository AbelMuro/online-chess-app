const createDataChannel = async (_,{getState, dispatch, fulfillWithValue}) => {
    try{
        const state = getState();
        const dataChannel = state.peerConnection.createDataChannel('chat');            
        dataChannel.onopen = async () => {
            fulfillWithValue({dataChannel});    
        };
        dataChannel.onclose = () => {
            dispatch({type: 'CLOSE_DATA_CHANNEL'})
        };  
        dataChannel.onerror = (error) => {
            console.log('Local data channel experienced an error ', error);
            dispatch({type: 'SET_ERROR', payload: {error}});
        };
        dataChannel.onmessage = (e) => {
            console.log('Received message from remote client', e.data)
            const data = JSON.parse(e.data);
            const message = data.message;
            dispatch({type: 'SET_MESSAGE', payload: {message}})
        };        
    }
    catch(error){
        const message = error.message;
        return Promise.reject(message);
    }
}

export default createDataChannel;