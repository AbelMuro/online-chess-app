const dataChannelOnOpen = (setDataChannelOpen) => {
    return () => {
        console.log('Local data channel open');    
        setDataChannelOpen(true);    
    }
};

const dataChannelOnClose = (setDataChannelOpen) => {
    return () => {
        console.log('Local data channel closed');
        setDataChannelOpen(false);
    }
}


const dataChannelOnError = (setConnection) => {
  return (error) => {
        console.log('Local data channel error: ', error);
        setConnection('disconnected');
    }  
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