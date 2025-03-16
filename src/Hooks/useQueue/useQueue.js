import {useState, useEffect} from 'react';
import Ably from 'ably';

function useQueue() {
    const [queue, setQueue] = useState([]);

    useEffect(() => {
        const ably = new Ably.Realtime(process.env.ABLY_API_KEY); 
        const channel = ably.channels.get('queue-channel');

        channel.subscribe('queue-update', (message) => {
            setQueue((prevUpdates) => [...prevUpdates, message.data]);
        });

        return () => {
            channel.unsubscribe();
            ably.close();
        };
    }, [])

    return [queue, setQueue];
}

export default useQueue;