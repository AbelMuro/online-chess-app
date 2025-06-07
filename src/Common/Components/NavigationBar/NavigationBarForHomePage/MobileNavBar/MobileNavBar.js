import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion';
import { overlayVariants, menuVariants} from './Variants';
import * as styles from './styles.module.css';

//this is where i left off, i need to create the animation for the mobile menu bar with framer-motion

function MobileNavBar({handleLink}) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleNavigate = (route) => {
        navigate(route);
    }

    return(
        <>
            <nav className={styles.navigation}>
                <button className={styles.navigation_button} onClick={handleOpen}>
                    <img />
                </button>
            </nav>  
            <AnimatePresence>
               {open && 
               <motion.div className={styles.overlay} initial='hidden' animate='show' exit='exit' variants={overlayVariants}>
                    <motion.menu className={styles.menu} initial='hidden' animate='show' exit='exit' variants={menuVariants}>
                        <button className={styles.menu_close} onClick={handleOpen}>
                            <img/>
                        </button>
                        <ul className={styles.menu_links} onClick={handleOpen}>
                            <li onClick={() => handleLink('intro')}>
                                <a>
                                    Intro
                                </a>
                            </li>
                            <li onClick={() => handleLink('about-us')}>
                                <a>
                                    About Us
                                </a>
                            </li>
                            <li onClick={() => handleLink('faq')}>
                                <a>
                                    FAQ
                                </a>
                            </li>
                            <li onClick={() => handleLink('footer')}>
                                <a>
                                    Credits
                                </a>
                            </li>
                            <li onClick={() => handleNavigate('/register')}>
                                <button className={styles.menu_register}>
                                    Register
                                </button>
                            </li>
                            <li onClick={() => handleNavigate('/login')}>
                                <button className={styles.menu_login}>
                                    Login
                                </button>
                            </li>
                        </ul>
                    </motion.menu>  
                </motion.div>
                }
            </AnimatePresence>

        </>
    )
}

export default MobileNavBar;