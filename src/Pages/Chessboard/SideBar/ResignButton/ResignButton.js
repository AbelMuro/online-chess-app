import React from 'react';
import Dialog from '~/Common/Components/Dialog';
import {syncDatabaseWithState} from '!/ChessReducer'
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import icons from '../icons';
import MessageBox from '~/Common/Components/MessageBox';
import * as styles from './styles.module.css';

function ResignButton(){
    const currentTurn = useSelector(state => state.chess.current_turn);
    const dispatch = useDispatch();
    const {matchId} = useParams();


    const handleResignation = () => {
        dispatch({type: 'RESIGNS', payload: {resigns: currentTurn}});
        dispatch({type: 'STOP_TIMER'});
        matchId !== 'ai' && dispatch(syncDatabaseWithState(matchId));  
    }

    return(
        <>
            <Dialog 
                Content={({handleOpen}) => {
                    return (
                        <> 
                            <h2 className={styles.dialog_title}>
                                Are you sure you want to resign?
                            </h2>
                            <button className={styles.dialog_button} onClick={() => {handleResignation(); handleOpen()}}>
                                Yes
                            </button>
                            <button className={styles.dialog_button} onClick={handleOpen}>
                                No
                            </button>                        
                        </>
                    )
                }}
                Button={({handleOpen}) => {
                    return(
                        <MessageBox message={'Resign'} Component={({onMouseEnter, onMouseLeave, onClick, children}) => {
                            return(
                                <button 
                                    className={styles.button} 
                                    onMouseEnter={onMouseEnter}
                                    onMouseLeave={onMouseLeave}
                                    onClick={() => {handleOpen(); onClick()}}
                                    >
                                        {children}
                                    <img src={icons['resign']}/>
                                </button>
                            )
                        }}/> 
                    )
                }}/>       
        </>

    )
}

export default ResignButton;