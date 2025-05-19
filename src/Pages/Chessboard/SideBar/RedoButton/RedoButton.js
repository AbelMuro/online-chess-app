import React from 'react';
import {useParams} from 'react-router-dom';
import MessageBox from '~/assets/Components/MessageBox';
import icons from '../icons';
import {useDispatch} from 'react-redux';
import * as styles from './styles.module.css';

function RedoButton(){
    const {matchId} = useParams();
    if(matchId !== 'ai') return null;
    const dispatch = useDispatch();

    const handleForward = () => {
        dispatch({type: 'REDO'})
    }


    return(                
        <MessageBox message={'Forward'} Component={({onMouseEnter, onMouseLeave, children}) => {
                return (
                    <button className={styles.button}
                        onMouseEnter={onMouseEnter} 
                        onMouseLeave={onMouseLeave}
                        onClick={handleForward}
                        >
                            {children}
                            <img src={icons['arrowRight']}/>
                    </button>
                )
            }}/>
    )
}

export default RedoButton;