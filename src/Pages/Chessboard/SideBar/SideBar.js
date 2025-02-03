import React from 'react';
import icons from './icons';
import {MessageBox} from '~/assets/Components/MessageBox';
import {useSelector} from 'react-redux'
import * as styles from './styles.module.css';

function SideBar(){
    const currentTurn = useSelector(state => state.chess.current_turn)
    
    return(
        <aside className={styles.bar}>
            <h1 className={styles.bar_title}>
                {`${currentTurn} to move`}
            </h1>
            <div className={styles.bar_buttons}>
                <MessageBox message={'Resign'} Component={({onMouseEnter, onMouseLeave}) => {
                    return(
                        <button 
                            className={styles.bar_buttons_resign} 
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                            >
                            <img src={icons['resign']}/>
                        </button>
                    )
                }}/>
                <button className={styles.bar_buttons_forward}>
                    <img src={icons['arrowLeft']}/>
                </button>
                <button className={styles.bar_buttons_back}>
                    <img src={icons['arrowRight']}/>
                </button>
            </div>
        </aside>
    )
}

export default SideBar;