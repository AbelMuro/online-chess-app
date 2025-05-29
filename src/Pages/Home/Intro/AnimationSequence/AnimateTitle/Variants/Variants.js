export const container_variant = {
    text_hidden: {},
    write_text: {
        transition: {
            staggerChildren: 0.2
        }
    }
}

export const text_variant = {
    text_hidden: {
        strokeDashoffset: 350, 
    },
    write_text: {
        strokeDashoffset: 0,
        transition: {
            type: 'tween',
            duration: 1,
        }
    }
}