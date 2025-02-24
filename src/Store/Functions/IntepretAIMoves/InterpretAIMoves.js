import {saveMove} from '../RecordMoves';

//this is where i left off, i will need to finish implementing this function
//i also want to re-engineer the logic for the rooks and kings being moved for the first time, i only need to keep track of the current player's rooks and king

export const IntepretAIMoves = (state, bestMove) => {
    const enPassant = bestMove.includes('e.p');
    const castleKingSide = bestMove.includes('o-o');
    const castleQueenSide = bestMove.includes('o-o-o');
    let rookToBeCastled = null;
    const from = bestMove.slice(0, 2);
    const to = bestMove.slice(2, 4);
    const promotion = bestMove[4];
    const piece_color = state.opponent_color;
    const columns = {
        a: 0,
        b: 1,
        c: 2,
        d: 3,
        e: 4,
        f: 5,
        g: 6,
        h: 7
    };
    const row = {
        '1': 7,
        '2': 6,
        '3': 5,
        '4': 4,
        '5': 3,
        '6': 2,
        '7': 1,
        '8': 0
    }
    const pieces = {
        'p': `${piece_color} pawn`,
        'r': `${piece_color} rook`,
        'b': `${piece_color} bishop`,
        'n': `${piece_color} knight`,
        'q': `${piece_color} queen`,
        'k': `${piece_color} king`,
    }

    const fromColumn = columns[from[0]];
    const fromRow = row[from[1]];
    const toColumn = columns[to[0]];
    const toRow = row[to[1]];

    const pieceToBeMoved = state.board[fromRow][fromColumn];
    const pieceToBeTaken = state.board[toRow][toColumn];

        
    if(castleKingSide || castleQueenSide){
        const rookRow = piece_color === 'black' ? 0 : 7;
        const rookColumn = castleKingSide ? 7 : 0;
        const kingRow = piece_color === 'black' ? 0 : 7;
        const kingColumn = 4;

        const rookToBeMoved = state.board[rookRow][rookColumn];
        const kingToBeMoved = state.board[kingRow][kingColumn];
        state.board[rookRow][rookColumn] = '';

        if(castleKingSide)
            state.board[rookRow][rookColumn - 2] = rookToBeMoved;            
        else
            state.board[rookRow][rookColumn + 2] = rookToBeMoved;   

        state.board[kingRow][kingColumn] = '';
        
        if(castleKingSide)
            state.board[kingRow][kingColumn + 2] = kingToBeMoved
        else
            state.board[kingRow][kingColumn - 2] = kingToBeMoved
            
        if(castleKingSide)
            rookToBeCastled = {from: {row: rookRow, column: rookColumn}, to: {row: rookRow, column: rookColumn - 2}}
        else
            rookToBeCastled = {from: {row: rookRow, column: rookColumn}, to: {row: rookRow, column: rookColumn + 2}}
    }
    else{
        state.board[fromRow][fromColumn] = '';
        state.board[toRow][toColumn] =  promotion ? pieces[promotion] : pieceToBeMoved;        
    }


    saveMove(state, {
        from: {row: fromRow, column: fromColumn}, 
        to: {row: toRow, column: toColumn}, 
        pieceToBeTaken: pieceToBeTaken, //pieceTakenByEnPassant ? '' : pieceToBeTaken, 
        pieceToBeMoved,
        //enPassant: pieceTakenByEnPassant,
        castleling: rookToBeCastled,
      }
    )
}