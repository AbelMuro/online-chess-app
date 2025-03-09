import React, {useState} from 'react';
import { ClipLoader } from 'react-spinners';
import {useNavigate} from 'react-router-dom'
import EnterEmail from '~/assets/Components/EnterEmail';
import EnterUsername from '~/assets/Components/EnterUsername';
import RegisterPassword from '~/assets/Components/RegisterPassword';
import * as styles from './styles.module.css';

function Form(){
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password !== reEnterPassword) return;
        setError('');
        setLoading(true);
        const email = e.target.elements.email.value;
        const password = e.target.elements['register password'].value;
        const username = e.target.elements.username.value;
        const reEnterPassword = e.target.elements.password.value;

        try{
            const response = await fetch('http://localhost:4000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    username,
                }),
                credentials: 'include'
            })       
            
            if(response.status === 200){
                console.log('Account created successfully');
                navigate('/menu');
            }
            
            else if(response.status === 401){
                const message = await response.text();
                if(message.includes('username'))
                    setError('Username is already taken');
                else if(message.includes('email'))
                    setError('Email is already taken')
            }
                
            else{
                const message = await response.text();
                alert('Internal Server Error has occurred, please try again later.')
                console.log(message);
            }
                
        }
        catch(error){
            alert('Server is offline, please try again later.')
            console.log(error.message);
        }
        finally{
            setLoading && setLoading(false);
        }
    }

    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            <EnterEmail/>
            <EnterUsername/>
            <RegisterPassword/>
            {error && <p className={styles.error_message}>{error}</p>}
            <button className={styles.form_submit}>
                {loading ? <ClipLoader size='30px' color='rgb(206, 206, 206)'/> : 'Register'}
            </button>
        </form>
    )
}

export default Form;