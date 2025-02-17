import React from 'react';
import {useNavigate} from 'react-router-dom';
import Greeting from './Greeting';
import * as styles from './styles.module.css';

function Menu() {
    const navigate = useNavigate();

    const handleChessboard = (option) => {
        navigate('/chessboard', {state: {option}})
    }


    return(
        <section className={styles.menu}>
            <Greeting/>
            <button className={styles.menu_option} onClick={() => handleChessboard('ai')}>
                Play against AI
            </button>
            <button className={styles.menu_option} onClick={() => handleChessboard('online')}>
                Play online
            </button>
            <button className={styles.menu_option}>
                Log Out
            </button>
        </section>
    )
}

export default Menu;