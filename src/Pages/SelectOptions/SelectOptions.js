import React, {useState} from 'react';
import * as styles from './styles.module.css';


//this is where i left off, i will need to finish this component
function SelectOptions() {
    const [difficulty, setDifficulty] = useState('');
    const [color, setColor] = useState('');

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
            <button className={styles.menu_submit}>
                Play
            </button>
        </section>
    )
}

export default SelectOptions;