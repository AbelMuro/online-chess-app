import React, {useState} from 'react';
import * as styles from './styles.module.css';

function EnterUsername() {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const handleUsername = (e) => {
        e.target.setCustomValidity('');
        const input = e.target.value;
        if(input.length > 15) return;
        setError('');
        setUsername(input);
    }

    const handleBlur = (e) => {
        const isEmpty = e.target.validity.valueMissing;

        if(isEmpty)
            setError("Can't be empty.")
    }

    const handleInvalid = (e) => {
        e.target.setCustomValidity(' ');
        const isEmpty = e.target.validity.valueMissing;

        if(isEmpty)
            setError("Can't be empty.")
    }

    return(
        <fieldset className={styles.username}>
            <label className={styles.username_label} htmlFor='username'>
                Enter Username:
            </label>
            <input 
                id='username'
                type='text' 
                name='username'
                value={username}
                onChange={handleUsername}
                onInvalid={handleInvalid}
                onBlur={handleBlur}
                className={styles.username_input} 
                required
                />
            {error && <p className={styles.error_message}>{error}</p>}
        </fieldset>
    )
}

export default EnterUsername;