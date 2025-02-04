import React from 'react';
import icons from './icons';
import ResignButton from './ResignButton'
import {MessageBox} from '~/assets/Components/MessageBox';
import {useSelector} from 'react-redux'
import * as styles from './styles.module.css';

function SideBar(){
    const currentTurn = useSelector(state => state.chess.current_turn);

    const handleTakeBack = () => {

    }
    
    const handleForward = () => {

    }

    return(
        <aside className={styles.bar}>
            <h1 className={styles.bar_title}>
                {`${currentTurn} to move`}
            </h1>
            <div className={styles.bar_buttons}>
                <ResignButton/>
                <MessageBox message={'Take back'} Component={({onMouseEnter, onMouseLeave, children}) => {
                    return(
                        <button 
                            className={styles.bar_buttons_forward} 
                            onMouseEnter={onMouseEnter} 
                            onMouseLeave={onMouseLeave}
                            onClick={handleTakeBack}>
                                {children}
                                <img src={icons['arrowLeft']}/>
                        </button>
                    )
                }}/>
                <MessageBox message={'Forward'} Component={({onMouseEnter, onMouseLeave, children}) => {
                    return (
                        <button className={styles.bar_buttons_back}
                            onMouseEnter={onMouseEnter} 
                            onMouseLeave={onMouseLeave}
                            onClick={handleForward}
                            >
                                {children}
                                <img src={icons['arrowRight']}/>
                        </button>
                    )
                }}/>
            </div>
        </aside>
    )
}

export default SideBar;