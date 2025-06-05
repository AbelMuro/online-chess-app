import React , {useContext} from 'react';
import AnimateLines from './AnimateLines';
import * as styles from './styles.module.css';

function WhoWeAre() {

    return(
        <section className={styles.container}>
            <p className={styles.detail}>
                We are a rapidly growing organization dedicated
                to giving the best chess experience.
            </p>
            <AnimateLines/>
            <p className={styles.detail}>
                We love chess just as must as you do!
                we dedicated our whole lives for this game.
            </p>
        </section>
    )
}

export default WhoWeAre;