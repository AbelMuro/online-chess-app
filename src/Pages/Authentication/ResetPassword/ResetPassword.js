import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Form from './Form';
import {useParams} from 'react-router-dom';
import * as styles from './styles.module.css';

function ResetPassword() {
    const navigate = useNavigate();
    const {token} = useParams();

    useEffect(() => {
        if(!token)
            navigate('/');
    }, [token])

    return(
        <section className={styles.reset}>
            <h1 className={styles.reset_title}>
                Enter your new password
            </h1>
            <h2 className={styles.reset_desc}>
                Password must contain at least 1 letter, 1 number, 1 symbol and 8 characters
            </h2>
            <Form token={token}/>
        </section>
    )
}

export default ResetPassword;