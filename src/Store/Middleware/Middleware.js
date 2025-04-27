export const checkCurrentTurn = store => next => action => {
    const state = store.getState();
    const chess = state.chess;
    const board = chess.board;
    const currentTurn = chess.players.current_turn;
    const payload = action.payload
    const type = action.type;
    
    if(type === 'PIECE_TO_BE_MOVED'){
        const row = payload?.square?.row;
        const column = payload?.square?.column
        const pieceToBeMoved = board[row]?.[column];

        if(pieceToBeMoved?.includes(currentTurn))
            next(action);    
    }
    else
        if((chess.pieceToBeMoved.square.row !== null && chess.pieceToBeMoved.square.column !== null))
            next(action)
        
}