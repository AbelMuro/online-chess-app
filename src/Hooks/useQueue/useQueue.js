import {useState, useEffect} from 'react';

//this is where i left off, i still can't find the issue on why the front-end can't connect to the websocket from the back-end

const WEBSOCKET_URL = 'wss://world-class-chess-server.com:443'  

function useQueue() {
    const [queue, setQueue] = useState([]);

    useEffect(() => {
        const socket = new WebSocket(WEBSOCKET_URL);            	

        socket.onopen = () => {                                        
            console.log('Connected to WebSocket server');
        };
    
        socket.onmessage = (e) => {
            const change = JSON.parse(e.data);
            console.log(change);
        };                        
    
        socket.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };
    
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            socket?.close?.();
        }
    }, [])

    return [queue, setQueue];
}

    
export default useQueue;