import React from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import icons from './icons';
import * as styles from './styles.module.css';


//this is where i left off, i need to create the animation for the mobile menu bar with framer-motion

function MobileNavBar() {
    return(
        <>
            <nav className={styles.navigation}>
                <button className={styles.navigation_button}>
                    <img />
                </button>
            </nav>  
            <AnimatePresence>
                <div className={styles.overlay}>
                    <menu className={styles.menu}>
                        <button className={styles.menu_close}>
                            <img/>
                        </button>

                        <ul className={styles.menu_links}>
                            <li>
                                <a>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a>
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a>
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </menu>  
                </div>
            </AnimatePresence>

        </>
    )
}

export default MobileNavBar;