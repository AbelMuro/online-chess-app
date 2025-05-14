export const button_variant = {
    hidden: {
        scale: 1,
        opacity: 0
    },
    show: {
        opacity: 1
    },
}

export const linearGradientBlue_variant = {
    initial: {
        offset: '0%',
    },
    animate: {
        offset: '50%',
        transition: { 
            duration: 2, 
            repeat: Infinity, 
            repeatType: 'reverse'
        }
    }
}

export const linearGradientBlack_variant = {
    initial: {
        offset: '50%',
    },
    animate: {
        offset: '100%',
        transition: { 
            duration: 2, 
            repeat: Infinity, 
            repeatType: 'reverse'
        }
    }
}