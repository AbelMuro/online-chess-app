import React, {memo} from 'react';
import {useParams} from 'react-router-dom';
import MobileDisplayTurn from './MobileDisplayTurn';
import ShowMovesDialog from './ShowMovesDialog';
import PiecesTakenDialog from './PiecesTakenDialog';
import Timer from '../Timer';
import ResignButton from '../ResignButton';
import TakeBackButton from '../TakeBackButton';
import RedoButton from '../RedoButton';
import * as styles from './styles.module.css';

function MobileBar() {

    return(
        <section className={styles.container}>
            <MobileDisplayTurn/>
            <ShowMovesDialog/>
            <PiecesTakenDialog/>
            <div className={styles.buttons}>
                <ResignButton/>                
                <TakeBackButton/>
                <RedoButton/>
            </div>
            <Timer/>
        </section>
    )
}

export default memo(MobileBar);