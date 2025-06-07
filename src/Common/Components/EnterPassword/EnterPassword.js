import React, {useState} from 'react';
import * as styles from './styles.module.css';

function EnterPassword() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handlePassword = (e) => {
        e.target.setCustomValidity('');
        const input = e.target.value;
        setError('');
        setPassword(input);
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
        <fieldset className={styles.password}>
            <label className={styles.password_label} htmlFor='password'>
                Enter Password:
            </label>
            <input 
                id='password'
                type='password' 
                name='password'
                value={password}
                onChange={handlePassword}
                onInvalid={handleInvalid}
                onBlur={handleBlur}
                className={styles.password_input} 
                required
                />
            {error && <p className={styles.error_message}>{error}</p>}
        </fieldset>
    )
}

export default EnterPassword;

