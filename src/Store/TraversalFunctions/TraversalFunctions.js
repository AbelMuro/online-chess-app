export const northSquares = (callback, row) => {
    for(let i = row + 1; i <= 7; i++){
        const continueIteration = callback(i);

        if(!continueIteration) break;
    }
}
export const southSquares = (callback, row) => {
    for(let i = row - 1; i >= 0; i--){
        const continueIteration = callback(i);

        if(!continueIteration) break;
    }
}

export const westSquares = (callback, column) => {
    for(let i = column - 1; i >= 0; i--){
        const continueIteration = callback(i);

        if(!continueIteration) break;
    }
}

export const eastSquares = (callback, column) => {
    for(let i = column + 1; i <= 7; i++){
        const continueIteration = callback(i);

        if(!continueIteration) break;
    }
}

export const northWestSquares = (callback, row, column) => {
    for(let i = row + 1, j = column - 1; i <= 7 && j >= 0; i++, j--){
        const continueIteration = callback(i, j);

        if(!continueIteration) break;
    }
}

export const northEastSquares = (callback, row, column) => {
    for(let i = row + 1, j = column + 1; i <= 7 && j <= 7; i++, j++){
        const continueIteration = callback(i, j);

        if(!continueIteration) break;
    }
}

export const southWestSquares = (callback, row, column) => {
    for(let i = row - 1, j = column - 1; i >= 0 && j >= 0; i--, j--){
        const continueIteration = callback(i, j);

        if(!continueIteration) break;
    }
}

export const southEastSquares = (callback, row, column) => {
    for(let i = row - 1, j = column + 1; i >= 0 && j <= 7; i--, j++){
        const continueIteration = callback(i, j);

        if(!continueIteration) break;
    }
}