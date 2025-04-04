import React, {useState} from 'react';
import { ClipLoader } from 'react-spinners';
import {useNavigate} from 'react-router-dom';
import * as styles from './styles.module.css';

function PlayOnlineButton(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleWebsockets = async () => {
        setLoading(true);
        try{
            const response = await fetch('https://world-class-chess-server.com/initialize_websockets', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: '',
                credentials: 'include'
            });

            if(response.status === 200){
                const result = await response.text();
                console.log(result);
                navigate('/findplayers');
            }
            else if(response.status === 403){
                const result = await response.text();
                console.log(result);
                alert(result);
                navigate('/')
            }
            else{
                const result = await response.text();
                console.log(result);
                dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Internal Server Error has occurred, please try again later.'}})
            }
        }
        catch(error){
            const message = error.message;
            console.log(message);
            dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Server is offline, please try again later.'}})
        }
        finally{
            setLoading && setLoading(false);
        }
    }


    return(            
        <button className={styles.play_button} onClick={handleWebsockets}>
            {loading ? <ClipLoader size='30px' color='rgb(206, 206, 206)'/> : 'Play online'}
        </button>
    )
}

export default PlayOnlineButton;