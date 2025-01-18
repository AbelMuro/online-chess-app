import { createAction, createReducer } from '@reduxjs/toolkit'

//this is where i left off, i need to implement en passant in one of the actions below

const movePiece = createAction('MOVE_PIECE');
const changeTurn = createAction('CHANGE_TURN');
const pieceToBeMoved = createAction('PIECE_TO_BE_MOVED');
const highlightNorthSquares = createAction('HIGHLIGHT_NORTH_SQUARES');
const highlightSouthSquares = createAction('HIGHLIGHT_SOUTH_SQUARES');
const highlightWestSquares = createAction('HIGHLIGHT_WEST_SQUARES');
const highlightEastSquares = createAction('HIGHLIGHT_EAST_SQUARES');
const highlightNorthWestSquares = createAction('HIGHLIGHT_NORTHWEST_SQUARES');
const highlightNorthEastSquares = createAction('HIGHLIGHT_NORTHEAST_SQUARES');
const highlightSouthWestSquares = createAction('HIGHLIGHT_SOUTHWEST_SQUARES');
const highlightSouthEastSquares = createAction('HIGHLIGHT_SOUTHEAST_SQUARES');
const highlightKnightSquares = createAction('HIGHLIGHT_KNIGHT_SQUARES');
const highlightPawnSquares = createAction('HIGHLIGHT_PAWN_SQUARES');

const setIllegalMovesForWhiteKing = createAction('SET_ILLEGAL_MOVES_FOR_WHITE_KING');
const setIllegalMovesForBlackKing = createAction('SET_ILLEGAL_MOVES_FOR_BLACK_KING');
const clearIllegalMovesForWhiteKing = createAction('CLEAR_ILLEGAL_MOVES_FOR_WHITE_KING');
const clearIllegalMovesForBlackKing = createAction('CLEAR_ILLEGAL_MOVES_FOR_BLACK_KING');
const setBlackKingInCheck = createAction('SET_BLACK_KING_IN_CHECK');
const setWhiteKingInCheck = createAction('SET_WHITE_KING_IN_CHECK');

const highlightBlueSquares = createAction('HIGHLIGHT_BLUE_SQUARES');
const highlightRedSquares = createAction('HIGHLIGHT_RED_SQUARES');

const setForkedPieces = createAction('SET_FORKED_PIECES');

const setEnPassant = createAction('SET_ENPASSANT');
const movePieceWithEnPassant = createAction('MOVE_PIECE_WITH_ENPASSANT')

const initialState = { 
    board: [
      ['white rook', 'white knight', 'white bishop', 'white queen', 'white king', 'white bishop', 'white knight', 'white rook'],
      ['white pawn', 'white pawn', 'white pawn', 'white pawn', 'white pawn', 'white pawn', 'white pawn', 'white pawn'],
      ['', '', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '', '',],
      ['black pawn', 'black pawn', 'black pawn', 'black pawn', 'black pawn', 'black pawn', 'black pawn', 'black pawn'],
      ['black rook', 'black knight', 'black bishop', 'black queen', 'black king', 'black bishop', 'black knight', 'black rook'],
    ],
    blue_squares: [],
    red_squares: [],
    illegal_moves_for_white_king: [],
    illegal_moves_for_black_king: [],
    black_king_in_check: false,
    white_king_in_check: false,
    forked_pieces: [],
    current_turn: 'white',
    en_passant: null,
    pieceToBeMoved: {square: {row: null, column: null}},
  }

const chessReducer = createReducer(initialState, (builder) => {      
  builder
    .addCase(movePiece, (state, action) => {    
      const oldRow = state.pieceToBeMoved.square.row;
      const oldColumn = state.pieceToBeMoved.square.column; 
      const newRow = action.payload.square.row;
      const newColumn = action.payload.square.column;        
      const pieceToBeMoved = state.board[oldRow][oldColumn];
      state.board[oldRow][oldColumn] = '';
      state.board[newRow][newColumn] = pieceToBeMoved;
      state.pieceToBeMoved = initialState.pieceToBeMoved;
      state.blue_squares = [];
      state.red_squares = [];
    })
    .addCase(highlightNorthSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const blueSquares = [];
      const redSquares = []

      for(let i = row + 1; i <= 7; i++){
        if(state.board[i][column] === '')
          blueSquares.push({row: i, column})
        else if(!state.board[i][column].includes(piece_color)){
          redSquares.push({row: i, column});
          break
        }
        else
          break;
      }

      state.blue_squares = [...state.blue_squares, ...blueSquares];
      state.red_squares = [...state.red_squares, ...redSquares];
    })
    .addCase(highlightSouthSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const blueSquares = [];
      const redSquares = [];

      for(let i = row - 1; i >= 0; i--){
        if(state.board[i][column] === '')
          blueSquares.push({row: i, column})
        else if(!state.board[i][column].includes(piece_color)){
          redSquares.push({row: i, column});
          break
        }
        else
          break;
      }
      state.blue_squares = [...state.blue_squares, ...blueSquares];
      state.red_squares = [...state.red_squares, ...redSquares];
    })
    .addCase(highlightWestSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const blueSquares = [];
      const redSquares = [];

      for(let i = column - 1; i >= 0; i--){
        if(state.board[row][i] === '')
          blueSquares.push({row, column: i})
        else if(!state.board[row][i].includes(piece_color)){
          redSquares.push({row, column: i});
          break
        }
        else
          break;
      }
      state.blue_squares = [...state.blue_squares, ...blueSquares];
      state.red_squares = [...state.red_squares, ...redSquares];
    })
    .addCase(highlightEastSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const blueSquares = [];
      const redSquares = [];

      for(let i = column + 1; i <= 7; i++){
        if(state.board[row][i] === '')
          blueSquares.push({row, column: i})
        else if(!state.board[row][i].includes(piece_color)){
          redSquares.push({row, column: i});
          break
        }
        else
          break;
      }

      state.blue_squares = [...state.blue_squares, ...blueSquares];
      state.red_squares = [...state.red_squares, ...redSquares];
    })
    .addCase(highlightNorthWestSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const blueSquares = [];
      const redSquares = [];

      for(let i = row + 1, j = column - 1; i <= 7 && j >= 0; i++, j--){
        if(state.board[i][j] === '')
          blueSquares.push({row: i, column: j})
        else if(!state.board[i][j].includes(piece_color)){
          redSquares.push({row: i, column: j});
          break
        }
        else
          break;
      }

      state.blue_squares = [...state.blue_squares, ...blueSquares];
      state.red_squares = [...state.red_squares, ...redSquares];
    })
    .addCase(highlightNorthEastSquares, (state, action) => {
      console.log('north east')
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const blueSquares = [];
      const redSquares = [];

      for(let i = row + 1, j = column + 1; i <= 7 && j <= 7; i++, j++){
        if(state.board[i][j] === '')
          blueSquares.push({row: i, column: j})
        else if(!state.board[i][j].includes(piece_color)){
          redSquares.push({row: i, column: j});
          break
        }
        else
          break;
      }

      state.blue_squares = [...state.blue_squares, ...blueSquares];
      state.red_squares = [...state.red_squares, ...redSquares];
    })
    .addCase(highlightSouthWestSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const blueSquares = [];
      const redSquares = [];

      for(let i = row - 1, j = column - 1; i >= 0 && j >= 0; i--, j--){
        if(state.board[i][j] === '')
          blueSquares.push({row: i, column: j})
        else if(!state.board[i][j].includes(piece_color)){
          redSquares.push({row: i, column: j});
          break
        }
        else
          break;
      }

      state.blue_squares = [...state.blue_squares, ...blueSquares];
      state.red_squares = [...state.red_squares, ...redSquares];
    })
    .addCase(highlightSouthEastSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const blueSquares = [];
      const redSquares = [];

      for(let i = row - 1, j = column + 1; i >= 0 && j <= 7; i--, j++){
        if(state.board[i][j] === '')
          blueSquares.push({row: i, column: j})
        else if(!state.board[i][j].includes(piece_color)){
          redSquares.push({row: i, column: j});
          break
        }
        else
          break;
      }

      state.blue_squares = [...state.blue_squares, ...blueSquares];
      state.red_squares = [...state.red_squares, ...redSquares];
    })
    .addCase(highlightKnightSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const blueSquares = [];
      const redSquares = [];
      const legalSquares = [
        {row: row + 2, column: column - 1}, 
        {row: row + 2, column : column + 1},
        {row: row - 1, column: column + 2}, 
        {row: row + 1, column: column + 2},
        {row: row - 2, column: column + 1},
        {row: row - 2, column: column - 1},
        {row: row + 1, column: column - 2},
        {row: row - 1, column: column - 2}
      ];

      legalSquares.forEach((square) => {
        if(state.board[square.row]?.[square.column] === '')
            blueSquares.push(square);
        else if(state.board[square.row]?.[square.column] && !state.board[square.row]?.[square.column].includes(piece_color))
            redSquares.push(square);
          
      })
      state.blue_squares = [...state.blue_squares, ...blueSquares];
      state.red_squares = [...state.red_squares, ...redSquares];
    })
    .addCase(highlightPawnSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const pawnHasntMovedYet = row === 1 || row === 6;
      const blueSquares = [];
      const redSquares = [];


      const oneSquareMove = piece_color === 'white' ? {row: row + 1, column} : {row: row - 1, column};
      const twoSquareMove = piece_color === 'white' ? {row: row + 2, column} : {row: row - 2, column};
      const leftCornerTake = piece_color === 'white' ? {row: row + 1, column: column - 1} : {row: row - 1, column: column - 1};
      const rightCornerTake = piece_color === 'white' ? {row: row + 1, column: column + 1} : {row: row - 1, column: column + 1};


      if(state.board[oneSquareMove.row]?.[oneSquareMove.column] === '');
          blueSquares.push(oneSquareMove);
      if(pawnHasntMovedYet && state.board[twoSquareMove.row]?.[twoSquareMove.column] === '')
          blueSquares.push(twoSquareMove)

      if(state.board[leftCornerTake.row]?.[leftCornerTake.column] && 
        !state.board[leftCornerTake.row]?.[leftCornerTake.column].includes(piece_color))
          redSquares.push(leftCornerTake);
      if(state.board[rightCornerTake.row]?.[rightCornerTake.column]?.includes(piece_color))
          redSquares.push(rightCornerTake);

      state.blue_squares = [...state.blue_squares, ...blueSquares];
      state.red_squares = [...state.red_squares, ...redSquares];
    })
    .addCase(highlightBlueSquares, (state, action) => {
      state.blue_squares.push(...action.payload.squares);
    })
    .addCase(highlightRedSquares, (state, action) => {
      state.red_squares.push(...action.payload.squares);
    })
    .addCase(setIllegalMovesForBlackKing, (state, action) => {
      state.illegal_moves_for_black_king.push(...action.payload.squares);
    })
    .addCase(setIllegalMovesForWhiteKing, (state, action) => {
      state.illegal_moves_for_white_king.push(...action.payload.squares);
    })
    .addCase(clearIllegalMovesForWhiteKing, (state, action) => {
      const piece = action.payload.piece;
      state.illegal_moves_for_white_king = state.illegal_moves_for_white_king.filter((squares) => {
        return piece !== squares.piece; 
      });
    })  
    .addCase(clearIllegalMovesForBlackKing, (state, action) => {
      const piece = action.payload.piece;
      state.illegal_moves_for_black_king = state.illegal_moves_for_black_king.filter((squares) => {
        return piece !== squares.piece; 
      });
    })  
    .addCase(setBlackKingInCheck, (state, action) => {
      state.black_king_in_check = action.payload.check;
    })
    .addCase(setWhiteKingInCheck, (state, action) => {
      state.white_king_in_check = action.payload.check;
    })
    .addCase(changeTurn, (state) => {
      state.current_turn = state.current_turn === 'white' ? 'black' : 'white';
    })
    .addCase(setEnPassant, (state, action) => {
      state.en_passant = action.payload;
    })
    .addCase(movePieceWithEnPassant, (state) => {
      if(!state.en_passant) return;

      const squareToMoveInto = state.en_passant.squareToMoveInto;
      const pieceToBeTaken = state.en_passant.pieceToBeTaken;
      let pieceToBeMoved = state.pieceToBeMoved.square;
      let piece = state.board[pieceToBeMoved.row][pieceToBeMoved.column];

      state.board[squareToMoveInto.row][squareToMoveInto.column] = piece;
      state.board[pieceToBeTaken.row][pieceToBeTaken.column] = '';
      state.board[pieceToBeMoved.row][pieceToBeMoved.column] = '';
      state.en_passant = null;
      state.pieceToBeMoved = initialState.pieceToBeMoved;
      state.blue_squares = [];
      state.red_squares = [];
    })
    .addCase(pieceToBeMoved, (state, action) => {
      state.pieceToBeMoved = action.payload;
      state.blue_squares = [];
      state.red_squares = [];
    })
    .addCase(setForkedPieces, (state, action) => {
      state.forked_pieces = action.payload.pieces;
    })
});

export default chessReducer;
