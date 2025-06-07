export const overlayVariants = {
    hidden: {
        opacity: 0
    },
    show: {
        opacity: 1,
        transition: {
            when: 'beforeChildren',
            delayChildren: 0.2,
        }
    },
    exit: {
        opacity: 0,
        transition: {
            when: 'afterChildren'
        }
    }
}


export const menuVariants = {
    hidden: {
        clipPath: 'circle(0px at 60px 30px)',
    },
    show: {
        clipPath: 'circle(100%)',
        transition: {
            duration: 1.2
        }
    },
    exit: {
        clipPath: 'circle(0px at 60px 30px)'
    }
}