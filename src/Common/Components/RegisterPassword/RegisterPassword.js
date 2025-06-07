import React, {useState, useEffect} from 'react';
import EnterPassword from './EnterPassword';
import ReEnterPassword from './ReEnterPassword';
import * as styles from './styles.module.css';

function RegisterPassword(){
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setError('');
        if(!password || !reEnterPassword) return;

        if(password !== reEnterPassword)
            setError("Passwords don't match.")
    }, [password, reEnterPassword])

    return(
        <>
            <EnterPassword password={password} setPassword={setPassword}/>     
            <ReEnterPassword password={reEnterPassword} setPassword={setReEnterPassword}/> 
            {error && <p className={styles.error_message}>{error}</p>}
        </>

    )
}

export default RegisterPassword;