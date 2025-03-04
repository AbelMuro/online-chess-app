import React from 'react';
import {useNavigate} from 'react-router-dom';
import Greeting from './Greeting';
import * as styles from './styles.module.css';

function Menu() {
    const navigate = useNavigate();

    const handleOptions = () => {
        navigate('/selectoptions')
    }

    const handleLogOut = async () => {
        try{
            const response = await fetch('http://localhost:4000/logout', {
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
            alert('Server is offline, please try again later')
        }
    }   

    return(
        <section className={styles.menu}>
            <Greeting/>
            <button className={styles.menu_option} onClick={handleOptions}>
                Play against AI
            </button>
            <button className={styles.menu_option} onClick={() => {}}>
                Play online
            </button>
            <button className={styles.menu_option} onClick={handleLogOut}>
                Log Out
            </button>
        </section>
    )
}

export default Menu;