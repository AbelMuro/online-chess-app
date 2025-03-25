import React from 'react';
import {useNavigate} from 'react-router-dom';
import Greeting from './Greeting';
import * as styles from './styles.module.css';

function Menu() {
    const navigate = useNavigate();

    const handleOptions = () => {
        navigate('/selectoptions')
    }

    const handleOnline = async () => {
        navigate('/findplayers')
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
                alert('User has been logged out');
                navigate('/');
            }

        }
        catch(error){
            const message = error.message;
            console.log(message);
            alert(message)
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