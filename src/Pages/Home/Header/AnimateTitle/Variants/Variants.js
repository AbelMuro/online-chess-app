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
        strokeDashoffset: 300, 
        //fill: '#ffffff00'
    },
    write_text: {
        strokeDashoffset: 0,
        //fill: '#ffffff',
        transition: {
            type: 'tween',
            duration: 1,
        }
    }
}