export const saveMove = (state, moveToBeSaved) => {    
    state.moves.unshift(moveToBeSaved);
    state.time_traveling.past.push(moveToBeSaved)
    state.time_traveling.future = [];   
}
