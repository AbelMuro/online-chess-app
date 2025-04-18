const dataChannelOnOpen = (peerConnection, setLocalClient) => {
    return () => {
        console.log('Local data channel open'); 
        setLocalClient(peerConnection?.localDescription?.type);        
    }
};

const dataChannelOnClose = (setLocalClient) => {
    return () => {
        console.log('Local data channel closed');
        setLocalClient(false);
    }
}


const dataChannelOnError = () => {
  return (error) => console.log('Local data channel error: ', error)  
}

const dataChannelOnMessage = () => {
    return (e) => console.log('Local data channel message ', e.data);
}

export {dataChannelOnOpen, dataChannelOnClose, dataChannelOnError, dataChannelOnMessage};