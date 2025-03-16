
//this is where i left off, netlify doenst support websocket servers, so i need to find another method of deploying these things


const connectToWebSocket = (onmessageFunction) => {
    const socket = new WebSocket('wss://world-class-chess-server.netlify.app');

    socket.onopen = () => {
        console.log('Connected to WebSocket server');
    };

    socket.onmessage = onmessageFunction;  // Update your front-end application with the received change

    socket.onclose = () => {
        console.log('Disconnected from WebSocket server');
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
}


export default connectToWebSocket;