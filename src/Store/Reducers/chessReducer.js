import { createAction, createReducer } from '@reduxjs/toolkit'

const movePiece = createAction('MOVE_PIECE');
const changeTurn = createAction('CHANGE_TURN');
const pieceToBeMoved = createAction('PIECE_TO_BE_MOVED');

const setIllegalMovesForWhiteKing = createAction('SET_ILLEGAL_MOVES_FOR_WHITE_KING');
const setIllegalMovesForBlackKing = createAction('SET_ILLEGAL_MOVES_FOR_BLACK_KING');
const clearIllegalMovesForWhiteKing = createAction('CLEAR_ILLEGAL_MOVES_FOR_WHITE_KING');
const clearIllegalMovesForBlackKing = createAction('CLEAR_ILLEGAL_MOVES_FOR_BLACK_KING');

const highlightBlueSquares = createAction('HIGHLIGHT_BLUE_SQUARES');
const highlightRedSquares = createAction('HIGHLIGHT_RED_SQUARES');

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
    illegal_squares_for_white_king: [],
    illegal_squares_for_black_king: [],
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
    .addCase(highlightBlueSquares, (state, action) => {
      state.blue_squares.push(...action.payload.squares);
    })
    .addCase(highlightRedSquares, (state, action) => {
      state.red_squares.push(...action.payload.squares);
    })
    .addCase(setIllegalMovesForBlackKing, (state, action) => {
      state.illegal_squares_for_black_king.push(...action.payload.squares);
    })
    .addCase(setIllegalMovesForWhiteKing, (state, action) => {
      state.illegal_squares_for_white_king.push(...action.payload.squares);
    })
    .addCase(clearIllegalMovesForWhiteKing, (state, action) => {
      const piece = action.payload.piece;
      state.illegal_squares_for_white_king = state.illegal_squares_for_white_king.filter((squares) => {
        return piece !== squares.piece; 
      });
    })  
    .addCase(clearIllegalMovesForBlackKing, (state, action) => {
      const piece = action.payload.piece;
      state.illegal_squares_for_black_king = state.illegal_squares_for_black_king.filter((squares) => {
        return piece !== squares.piece; 
      });
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
});

export default chessReducer;
