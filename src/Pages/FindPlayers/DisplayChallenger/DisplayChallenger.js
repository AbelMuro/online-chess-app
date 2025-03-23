import React from 'react';
import * as styles from './styles.module.css';


//test out this component and the fetch request as well, look at the back end for more details
function DisplayChallenger({currentPlayer, image, _id}) {

    const handleChallenge = async () => {
        try{
            const response = await fetch('https://world-class-chess-server-image-880168737393.us-central1.run.app/create_new_challenge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({playerToBeChallenged: currentPlayer, playerId: _id})
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
            <button>
                Decline
            </button>
        </div>
    )
}

export default DisplayChallenger;