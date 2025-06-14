import React from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import MessageBox from '~/Common/Components/MessageBox';
import icons from '../icons';
import * as styles from './styles.module.css'

function TakeBackButton() {
    const {matchId} = useParams();
    if(matchId !== 'ai') return null;
    const dispatch = useDispatch();

    const handleTakeBack = () => {
        dispatch({type: 'UNDO'})
    }
    

    return(
        <MessageBox message={'Take back'} Component={({onMouseEnter, onMouseLeave, children}) => {
            return(
                <button 
                    className={styles.button} 
                    onMouseEnter={onMouseEnter} 
                    onMouseLeave={onMouseLeave}
                    onClick={handleTakeBack}>
                        {children}
                        <img src={icons['arrowLeft']}/>
                </button>
            )
        }}/>
    )
}

export default TakeBackButton;