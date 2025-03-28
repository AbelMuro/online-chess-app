import React from 'react';
import * as styles from './styles.module.css';

function DisplayChallenger({username, image}) {

    const handleChallenge = async () => {
        try{
            const response = await fetch('https://world-class-chess-server.com/create_new_challenge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({playerToBeChallenged: username})
            })      
            
            if(response.status === 200){
                const result = await response.text();
                console.log(result);
                alert('Invite has been sent, please wait for their reply');
            }
            else{
                const result = await response.text();
                console.log(result);
                alert('Internal server error has occurred, please try again later');
            }
        }
        catch(error){
            const message = error.message;
            console.log(message);
            alert(message);
        }
    }

    return(               
         <div className={styles.queue_player} key={currentPlayer}>
            <img className={styles.queue_player_image} src={image}/>
            <h3>
                {currentPlayer}
            </h3>
            <button onClick={handleChallenge}>
                Challenge
            </button>
        </div>
    )
}

export default DisplayChallenger;