import React from 'react';
import {useNavigate} from 'react-router-dom';
import Greeting from './Greeting';
import * as styles from './styles.module.css';

function Menu() {
    const navigate = useNavigate();

    const handleOptions = () => {
        navigate('/selectoptions')
    }

    const handleOnline = () => {
        navigate('/queue');
    }

    const handleLogOut = async () => {
        try{
            const response = await fetch('http://localhost:8080/logout', {
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