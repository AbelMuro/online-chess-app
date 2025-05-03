import React, {useMemo, memo} from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import convertBase64ToBlobURL from '~/assets/functions/convertBase64ToBlobURL.js';
import DisplayPlayer from './DisplayPlayer';
import useWebSocket from '~/Hooks/useWebSocket';
import * as styles from './styles.module.css';
import icons from '~/assets/icons'

function FindPlayers() {
    const navigate = useNavigate();
    const [players, setPlayers] = useWebSocket(
        'wss://world-class-chess-server.com:443/queue', 
        (e) => {
            const documents = JSON.parse(e.data);             
            setPlayers(documents);            
        }, []);


    const availablePlayers = useMemo(() => {
        const currentPlayers = [];

        for(let i = 0; i < players.length; i++){
            const currentPlayer = sessionStorage.getItem('username');
            if(!currentPlayer) {
                navigate('/menu')
                return;
            }
            if(players[i].player === currentPlayer) continue;

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