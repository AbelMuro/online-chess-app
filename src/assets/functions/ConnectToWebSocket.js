const ConnectToWebsocket = (url, callback) =>  {
    const socket = new WebSocket(url);            	

    socket.onopen = () => {                                        
        console.log('Connected to WebSocket server');
    };

    socket.onmessage = callback;                        

    socket.onclose = () => {
        console.log('Disconnected from WebSocket server');
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
}