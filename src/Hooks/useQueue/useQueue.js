import {useState, useEffect} from 'react';

const WEBSOCKET_URL = 'wss://world-class-chess-server.com/queue:443'  

function useQueue() {
    const [queue, setQueue] = useState([]);

    useEffect(() => {
        const socket = new WebSocket(WEBSOCKET_URL);            	

        socket.onopen = () => {                                        
            console.log('Connected to WebSocket server');
        };
    
        socket.onmessage = (e) => {
            const documents = JSON.parse(e.data);              //this is where i left off
            setQueue(documents)            
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