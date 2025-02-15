export const saveMove = (state, moveToBeSaved) => {    
    state.moves.unshift(moveToBeSaved);
    state.past.push(moveToBeSaved)
    state.future = [];   
}
