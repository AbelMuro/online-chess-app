import React, {useState, memo} from 'react';
import * as styles from './styles.module.css';

function EnterPassword({password, setPassword}) {
    const [error, setError] = useState('');

    const handlePassword = (e) => {
        e.target.setCustomValidity('');
        const input = e.target.value;
        setError('');
        setPassword(input);
    }

    const handleBlur = (e) => {
        const isEmpty = e.target.validity.valueMissing;
        const patternMismatch = e.target.validity.patternMismatch;

        if(isEmpty)
            setError("Can't be empty.")
        else if(patternMismatch)
            setError("Password doesn't meet the requirements.")
    }

    const handleInvalid = (e) => {
        e.target.setCustomValidity(' ');
        const isEmpty = e.target.validity.valueMissing;

        if(isEmpty)
            setError("Can't be empty.")
        else
            setError("Password doesn't meet the requirements.")
    }

    return(
            <fieldset className={styles.password}>
                <label className={styles.password_label} htmlFor={'register password'}>
                    Enter Password:
                </label>
                <input 
                    id='register password'
                    type='password' 
                    name='register password'
                    value={password}
                    onChange={handlePassword}
                    onInvalid={handleInvalid}
                    onBlur={handleBlur}
                    pattern='(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}'
                    className={styles.password_input} 
                    required
                    />
                {error && <p className={styles.error_message}>{error}</p>}
            </fieldset>       
    )
}

export default memo(EnterPassword);