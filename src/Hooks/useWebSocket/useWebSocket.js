import {useState, useEffect} from 'react';


function useWebSocket(url, callback, initialState, dataToRemove) {
    const [data, setData] = useState(initialState);

    useEffect(() => {
        const socket = new WebSocket(url);            	

        socket.onopen = () => {                                        
            console.log(`Connected to ${url} webSocket server`);
        };
    
        socket.onmessage = callback;                        
    
        socket.onclose = () => {
            console.log(`Disconnected from ${url} webSocket server`);
        };
    
        socket.onerror = (error) => {
            console.error(`Error occurred in websocket ${url}: `, error);
        };

        return () => {
            socket?.send?.(JSON.stringify({action: 'remove', data: dataToRemove}))
            socket?.close?.();
        }
    }, [])

    return [data, setData];
}

    
export default useWebSocket;