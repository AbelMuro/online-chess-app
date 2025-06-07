import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Greeting from './Greeting';
import * as styles from './styles.module.css';

function Menu() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOptions = () => {
        navigate('/selectoptions')
    }

    const handleOnline = () => {
        navigate('/queue');
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
                dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'You have been logged out.'}})
                navigate('/');
            }
        }
        catch(error){
            const message = error.message;
            console.error('Server went offline in this endpoint /logout ', message);
            dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Server is offline, please try again later'}})
        }
    }   

    return(
        <section className={styles.menu}>
            <Greeting/>
            <button className={styles.menu_option} onClick={handleOptions}>
                Play against AI
            </button>
            <button className={styles.menu_option} onClick={handleOnline}>
                Play online
            </button>
            <button className={styles.menu_option} onClick={handleLogOut}>
                Log Out
            </button>
        </section>
    )
}

export default Menu;