import React from 'react';
import * as styles from './styles.module.css';
import Timer from '../Timer';
import ResignButton from '../ResignButton';
import TakeBackButton from '../TakeBackButton';
import RedoButton from '../RedoButton';

function MobileBar() {

    return(
        <section className={styles.container}>
            <div className={styles.buttons}>
                <TakeBackButton/>
                <RedoButton/>
            </div>
            <Timer/>
            <ResignButton/>
        </section>
    )
}

export default MobileBar;