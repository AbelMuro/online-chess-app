export const board_variants = {
    hidden: {
        display: 'none'
    },
    show: {
        display: 'grid',
        transition: {
            staggerChildren: 0.05
        }
    }
}

export const column_variants = {
    hidden: {
        scaleX: 0
    },
    show: {
        scaleX: 1,
        transition: {
            when: 'beforeChildren',
            staggerChildren: 0.2
        }
    }
}

export const row_variants = {
    hidden: {
        scaleY: 0
    },
    show: {
        scaleY: 1,
        transition: {
            when: 'beforeChildren',
            staggerChildren: 0.2
        }
    }
}

export const text_variants = {
    hidden: {
        opacity: 0
    },
    show: {
        opacity: 1
    }
}

export const square_variants = {
    hidden: {
        scale: 0
    },
    show: {
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 10,
        }
    }
}