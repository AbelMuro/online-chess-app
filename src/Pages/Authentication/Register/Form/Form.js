import React, {useState} from 'react';
import { ClipLoader } from 'react-spinners';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import EnterEmail from '~/assets/Components/EnterEmail';
import EnterUsername from '~/assets/Components/EnterUsername';
import RegisterPassword from '~/assets/Components/RegisterPassword';
import UploadImage from './UploadImage';
import * as styles from './styles.module.css';


function Form(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const password = e.target.elements['register password'].value;        
        const reEnterPassword = e.target.elements.password.value;
        if(password !== reEnterPassword) return;
        setError('');
        setLoading(true);        
        const email = e.target.elements.email.value;
        const username = e.target.elements.username.value;
        const image = e.target.elements.image.files[0];     

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('username', username);
        formData.append('image', image);

        try{
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                body: formData,
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
                else if(message.includes('image'))
                    setError("Image can't be uploaded");
            }
                
            else{
                const message = await response.text();
                dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Internal Server Error has occurred, please try again later.'}})
                console.log(message);
            }
                
        }
        catch(error){
            const message = error.message;
            console.log(message);
            dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Server is offline, please try again later.'}})
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
            <UploadImage/>
            {error && <p className={styles.error_message}>{error}</p>}
            <button className={styles.form_submit}>
                {loading ? <ClipLoader size='30px' color='rgb(206, 206, 206)'/> : 'Register'}
            </button>
        </form>
    )
}

export default Form;