export const checkEnpassant = (state, initialRow, newRow, newColumn) => {
    if(initialRow + 2 === newRow || initialRow - 2 === newRow)
        state.en_passant = {row: newRow, column: newColumn};
    else
        state.en_passant = null;      
}

export const implementEnPassant = (state, piece, oldRow, oldColumn, newRow, newColumn) => {
    if(!piece.includes('pawn')) {
        state.en_passant = null;
        return;
    }

    const opposing_color = piece.includes('white') ? 'black' : 'white';
    const pieceToBeTaken = state.en_passant;
    const row = pieceToBeTaken.row;
    const column = pieceToBeTaken.column;
      
    if(state.board[row][column].includes(`${opposing_color} pawn`) && 
        ((newColumn === column && newRow + 1 === row) && ((oldColumn + 1 === column || oldColumn - 1 === column) && oldRow === row)) ||                                 //black pawn
        ((newColumn === column && newRow - 1 === row) && ((oldColumn - 1 === column || oldColumn + 1 === column) && oldRow === row)) ){              //white pawn
            state.board[row][column] = '';
            state.en_passant = null;
        }   
    else
        checkEnpassant(state, oldRow, newRow, newColumn); 
}