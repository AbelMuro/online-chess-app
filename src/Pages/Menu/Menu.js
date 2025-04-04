import React from 'react';
import {useNavigate} from 'react-router-dom';
import Greeting from './Greeting';
import PlayOnlineButton from './PlayOnlineButton';
import * as styles from './styles.module.css';

function Menu() {
    const navigate = useNavigate();

    const handleOptions = () => {
        navigate('/selectoptions')
    }

    const handleLogOut = async () => {
        try{
            const response = await fetch('https://world-class-chess-server.com/logout', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: '',
                credentials: 'include'
            })

            if(response.status === 200){
                console.log('User has been logged out');
                dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'You have been logged out.'}})
                navigate('/');
            }
        }
        catch(error){
            const message = error.message;
            console.log(message);
            dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Server is offline, please try again later'}})
        }
    }   

    return(
        <section className={styles.menu}>
            <Greeting/>
            <button className={styles.menu_option} onClick={handleOptions}>
                Play against AI
            </button>
            <PlayOnlineButton/>
            <button className={styles.menu_option} onClick={handleLogOut}>
                Log Out
            </button>
        </section>
    )
}

export default Menu;