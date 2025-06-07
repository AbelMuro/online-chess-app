import React, {useMemo, memo} from 'react';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import convertBase64ToBlobURL from '~/assets/functions/convertBase64ToBlobURL.js';
import DisplayPlayer from './DisplayPlayer';
import useWebSocket from '~/Hooks/useWebSocket';
import * as styles from './styles.module.css';
import icons from '~/assets/icons'

function FindPlayers() {
    const username = useSelector(state => state.account.username);
    const [players, setPlayers] = useWebSocket(
        `wss://https://world-class-chess-server.com:443/queue?username=${username}`, 
        (e) => {
            const documents = JSON.parse(e.data);             
            setPlayers(documents);            
        }, []);


    const availablePlayers = useMemo(() => {
        const currentPlayers = [];

        for(let i = 0; i < players.length; i++){
            if(players[i].player === username) continue;

            const playerInQueue = players[i].player;
            const profileImageBase64 = players[i].profileImageBase64;
            const contentType = players[i].contentType;
            const url = profileImageBase64 ? convertBase64ToBlobURL(profileImageBase64, contentType) : icons['empty avatar'];

            currentPlayers.push(<DisplayPlayer username={playerInQueue} image={url}/>)                
        }

        return currentPlayers;

    }, [players])


    return (
        <>
            {(availablePlayers && availablePlayers.length === 0) && 
                <h2 className={styles.desc}>
                    Looking for other players
                </h2>}
            {(availablePlayers && availablePlayers.length === 0) ? <ClipLoader size={'35px'} color='#CECECE'/> : availablePlayers}        
        </>
    )

}

export default memo(FindPlayers);