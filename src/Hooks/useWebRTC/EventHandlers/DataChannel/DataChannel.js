const dataChannelOnOpen = () => {
    return () => {
        console.log('Local data channel open');        
    }
};

const dataChannelOnClose = (setConnected) => {
    return () => {
        console.log('Local data channel closed');
        setConnected('disconnected');
    }
}


const dataChannelOnError = () => {
  return (error) => console.log('Local data channel error: ', error)  
}

const dataChannelOnMessage = (setMessage) => {
    return (e) => {
        console.log('Local data channel message ', e.data)
        const data = JSON.parse(e.data);
        const message = data.message;
        setMessage(message);
    };
}

export {dataChannelOnOpen, dataChannelOnClose, dataChannelOnError, dataChannelOnMessage};