const overlayVariants = {
    hidden: {
        opacity: 0,
    },
    show: {
        opacity: 1,
        transition: {
            when: 'beforeChildren',
        }
    },
    exit: {
        opacity: 0,
        transition: {
            when: 'afterChildren',
        }
    }
}

const dialogVariants = {
    hidden: {
        scale: 0,
    },
    show: {
        scale: 1,
    },
    exit: {
        scale: 0,
    },
}

export {overlayVariants, dialogVariants};