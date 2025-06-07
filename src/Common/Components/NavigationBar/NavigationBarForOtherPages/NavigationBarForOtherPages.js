import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import * as styles from './styles.module.css';

function NavigationBarForOtherPages() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/')
    }

    useEffect(() => {
        const body = document.querySelector('body');
        body.style.backgroundColor = '#000070';
    }, [])

    return(
        <nav className={styles.container}>
            <button className={styles.goBack} onClick={handleNavigate}>
                <img />
            </button>   
        </nav>
    )
}

export default NavigationBarForOtherPages;