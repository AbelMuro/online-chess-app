import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import RegisterPassword from '~/assets/Components/RegisterPassword';
import { ClipLoader } from 'react-spinners';
import * as styles from './styles.module.css';

function Form({token}){
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const password = e.target.elements['register password'].value;
        const reEnterPassword = e.target.elements.password.value;
        if(password !== reEnterPassword) return;
        setLoading(true);

        try{
            const response = await fetch('https://world-class-chess-server.vercel.app/resetpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    password
                })
            })       
            
            if(response.status === 200){
                console.log('Password changed successfully');
                alert('Password changed successfully');
                navigate('/');
            }
            
            else if(response.status === 400){
                const message = await response.text();
                console.log(message);
                alert("Token is invalid or has expired");
                navigate('/forgotpassword');
            }
                
            else{
                const message = await response.text();
                console.log(message);
                alert('Internal Server Error has occurred, please try again later.') 
            }
        }
        catch(error){
            const message = error.message;
            console.log(message);
            alert('Server is offline, please try again later')
        }
        finally{
            setLoading && setLoading(false);
        }
        

    }

    return(        
        <form className={styles.form} onSubmit={handleSubmit}>
            <RegisterPassword/>
            <button className={styles.form_submit}>
                {loading ? <ClipLoader size='30px' color='rgb(206, 206, 206)'/> : 'Change Password'}
            </button>
        </form>
    )
}

export default Form;