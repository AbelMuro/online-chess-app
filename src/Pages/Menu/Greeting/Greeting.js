import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import * as styles from './styles.module.css';

function Greeting(){
    const navigate = useNavigate();
    const [name, setName] = useState('');

    const getName = async () => {
        try{
            const response = await fetch('http://localhost:4000/getname', {
                method: 'GET',
                credentials: 'include'
            })

            if(response.status === 200){
                const username = await response.text();
                console.log(username);
                setName(username);
            }
            else if(response.status === 403){
                const message = await response.text();
                console.log(message);
                alert('Please enable third-party-cookies in your browser to use this app');
                navigate('/')
            }
            else{
                const message = await response.text();
                console.log(message);
                alert('Internal Server error has occured, please try again later')
            }

        }
        catch(error){
            const message = error.message;
            console.log(message);
            alert('Server is offline, please try again later');
        }
    }

    useEffect(() => {
        getName();
    }, [])

    return(
        <h1 className={styles.title}>
            Hello {name}!
        </h1>
    )
}

export default Greeting;