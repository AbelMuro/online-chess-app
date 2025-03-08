import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import * as styles from './styles.module.css';


//this is where i left off, i will need to finish this component
function SelectOptions() {
    const [difficulty, setDifficulty] = useState('');
    const [color, setColor] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePlay = () => {
        let userColor;
        let opponentColor;
        if(color === 'random'){
            const random = Math.ceil((Math.random() * 2));
            userColor = random === 1 ? 'white' : 'black';
            opponentColor = userColor === 'white' ? 'black' : 'white';
        }
        else{
            userColor = color;
            opponentColor = color === 'white' ? 'black' : 'white';
        } 
            
        dispatch({type: 'SET_GAME_SETTINGS', payload: {user: userColor, opponent: opponentColor, difficulty}})
        navigate(`/chessboard/ai`)
    }

    const handleDifficulty = (option) => {
        setDifficulty(option)
    }

    const handleColor = (option) => {
        setColor(option)
    }

    const handleStylesForDifficulty = (option) => {
        if(option === difficulty)
            return {backgroundColor: '#1a1a5c'};
    }
    
    const handleStylesForColor = (option) => {
        if(option === color)
            return {backgroundColor: '#1a1a5c'}
    }

    return(
        <section className={styles.menu}>
            <h1 className={styles.menu_title}>
                Select Difficulty
            </h1>
            <button className={styles.menu_option} style={handleStylesForDifficulty('easy')} onClick={() => handleDifficulty('easy')}>
                Easy
            </button>
            <button className={styles.menu_option} style={handleStylesForDifficulty('medium')} onClick={() => handleDifficulty('medium')}>
                Medium
            </button>
            <button className={styles.menu_option} style={handleStylesForDifficulty('hard')} onClick={() => handleDifficulty('hard')}>
                Hard
            </button>
            <h1 className={styles.menu_title}>
                Select Color
            </h1>
            <button className={styles.menu_option} style={handleStylesForColor('white')} onClick={() => handleColor('white')}>
                White
            </button>
            <button className={styles.menu_option} style={handleStylesForColor('black')} onClick={() => handleColor('black')}>
                Black
            </button>
            <button className={styles.menu_option} style={handleStylesForColor('random')} onClick={() => handleColor('random')}>
                Random
            </button>
            <button className={styles.menu_submit} disabled={!color || !difficulty} onClick={handlePlay}>
                Play
            </button>
        </section>
    )
}

export default SelectOptions;