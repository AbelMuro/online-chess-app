import React, {useMemo, memo} from 'react';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import convertBase64ToBlobURL from '~/Common/Functions/convertBase64ToBlobURL.js';
import DisplayPlayer from './DisplayPlayer';
import useWebSocket from '~/Hooks/useWebSocket';
import * as styles from './styles.module.css';
import icons from '~/assets/icons'

function FindPlayers() {
    const username = useSelector(state => state.account.username);
    const [players, setPlayers] = useWebSocket(
        `wss://world-class-chess-server.com:443/queue?username=${username}`, 
        (e) => {
            const documents = JSON.parse(e.data);
            const allPromises = [];
            
            for(let i = 0; i < documents.length; i++){
                const playerInQueue = documents[i].player;
                const promise = fetch(`https://world-class-chess-server.com/get_player_account/${playerInQueue}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })

                allPromises.push(promise);
            }
            const responses = Promise.all(allPromises);                         //all promises will always be resolved in this case
            responses.then((responses) => {
                Promise.all(responses.map(async response => {
                    if(response.status === 200 || response.status === 404)
                        return result.json();
                    else{
                        const message = await response.text()
                        throw new Error(message);
                    }
                }))
                .then(accounts => setPlayers(accounts))
                .catch(error => console.log('error from one of the responses in /get_player_account: ', error.message))
            })
        }, []);


    const availablePlayers = useMemo(() => {
        if(!players.length) return [];
        let currentPlayers = [];

        for(let player of players){
            if(player.username === username) continue;

            const profileImageBase64 = player.imageBase64;
            const currentPlayer = player.username;
            const contentType = player.contentType;
            
            const url = profileImageBase64 ? convertBase64ToBlobURL(profileImageBase64, contentType) : icons['empty avatar'];
            currentPlayers.push(<DisplayPlayer username={currentPlayer} image={url} key={currentPlayer}/>)
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