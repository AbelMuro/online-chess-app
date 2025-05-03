const createDataChannel = async (_, {getState, dispatch, fulfillWithValue, rejectWithValue}) => {
    try{
        const state = getState();
        const dataChannel = state.peerConnection.createDataChannel('chat');           

        return new Promise((resolved, rejected) => {
            dataChannel.onopen = () => {
                resolved({dataChannel});  
            };
            dataChannel.onclose = () => {
                dispatch({type: 'CLOSE_DATA_CHANNEL'})
            };  
            dataChannel.onerror = (error) => {
                const message = error.message;
                console.log('Local data channel experienced an error ', message );
                dispatch({type: 'SET_ERROR', payload: {message }});
                rejected({message});
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
        return rejectWithValue({message});
    }
}

export default createDataChannel;