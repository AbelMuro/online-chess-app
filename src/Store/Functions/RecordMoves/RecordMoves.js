export const saveMove = (state, moveToBeSaved) => {    
    state.moves.all.unshift(moveToBeSaved);
    state.time_traveling.past.push(moveToBeSaved)
    state.time_traveling.future = [];   
}
