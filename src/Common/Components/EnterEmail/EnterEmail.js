import React, {useState} from 'react';
import * as styles from './styles.module.css';

function EnterEmail() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleEmail = (e) => {
        e.target.setCustomValidity('');
        const input = e.target.value;
        setError('');
        setEmail(input);
    }

    const handleBlur = (e) => {
        const isEmpty = e.target.validity.valueMissing;
        const isInvalid = e.target.validity.typeMismatch;

        if(isEmpty)
            setError("Can't be empty.")
        else if(isInvalid)
            setError("Email is invalid.");
    }

    const handleInvalid = (e) => {
        e.target.setCustomValidity(' ');
        const isEmpty = e.target.validity.valueMissing;

        if(isEmpty)
            setError("Can't be empty.")
        else
            setError("Email is invalid.");
    }

    return(
        <fieldset className={styles.email}>
            <label className={styles.email_label} htmlFor='email'>
                Enter Email:
            </label>
            <input 
                id='email'
                type='email' 
                name='email'
                value={email}
                onChange={handleEmail}
                onInvalid={handleInvalid}
                onBlur={handleBlur}
                className={styles.email_input} 
                required
                />
            {error && <p className={styles.error_message}>{error}</p>}
        </fieldset>
    )
}

export default EnterEmail;