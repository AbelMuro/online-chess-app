import { createAction, createReducer, createAsyncThunk } from '@reduxjs/toolkit'
import { northSquares, southSquares, westSquares, eastSquares, northWestSquares,northEastSquares, southEastSquares, southWestSquares, knightSquares, pawnSquares} from './Functions/TraversalFunctions';
import { createLegalSquaresWhileInCheck, createLegalSquaresForKing, createSquaresForCastleling} from './Functions/CreateSquares';
import { checkSquaresForCheck, checkSquaresForBlocks, checkSquaresForThreats} from './Functions/CheckSquares';
import { UnpinPieces, findPinnedPieces, findLegalMovesForPinnedPiece, CheckForDoublePin } from './Functions/PinnedPieces';
import { takeWithEnPassant } from './Functions/EnPassant';
import { legalMovesExist} from './Functions/Stalemate';
import { ResetState, ResetProperties} from './Functions/ResetState';
import {saveMove} from './Functions/RecordMoves';
import {IntepretAIMoves} from './Functions/IntepretAIMoves';
import { updateDatabaseWithState, updateStateWithDatabase } from './Middleware';

const movePiece = createAction('MOVE_PIECE');
const implementCastleling = createAction('IMPLEMENT_CASTLELING');
const implementEnPassant = createAction('IMPLEMENT_ENPASSANT');
const enableEnPassant = createAction('ENABLE_ENPASSANT');
const movePieceWithAI = createAction('MOVE_PIECE_WITH_AI');
const pieceToBeMoved = createAction('PIECE_TO_BE_MOVED');
const playerRanOutOfTime = createAction('PLAYER_RAN_OUT_OF_TIME');

const promotion = createAction('PROMOTION');
const undo = createAction('UNDO');
const redo = createAction('REDO');

const legalNorthSquares = createAction('LEGAL_NORTH_SQUARES');
const legalSouthSquares = createAction('LEGAL_SOUTH_SQUARES');
const legalWestSquares = createAction('LEGAL_WEST_SQUARES');
const legalEastSquares = createAction('LEGAL_EAST_SQUARES');
const legalNorthWestSquares = createAction('LEGAL_NORTHWEST_SQUARES');
const legalNorthEastSquares = createAction('LEGAL_NORTHEAST_SQUARES');
const legalSouthWestSquares = createAction('LEGAL_SOUTHWEST_SQUARES');
const legalSouthEastSquares = createAction('LEGAL_SOUTHEAST_SQUARES');
const legalKnightSquares = createAction('LEGAL_KNIGHT_SQUARES');
const legalPawnSquares = createAction('LEGAL_PAWN_SQUARES');
const legalKingSquares = createAction('LEGAL_KING_SQUARES');
const removeAllLegalSquares = createAction('REMOVE_ALL_LEGAL_SQUARES');

const isKingInCheck = createAction('IS_KING_IN_CHECK');
const isOpposingKingInCheck = createAction('IS_OPPOSING_KING_IN_CHECK');
const hasKingBeenMoved = createAction('HAS_KING_BEEN_MOVED');
const hasRooksBeenMoved = createAction('HAS_ROOKS_BEEN_MOVED')
const resigns = createAction('RESIGNS');
const countLegalMoves = createAction('COUNT_LEGAL_MOVES');
const resetLegalMoves = createAction('RESET_LEGAL_MOVES');
const checkStalemate = createAction('CHECK_STALEMATE');
const resetState = createAction('RESET_STATE')
const updateState = createAction('UPDATE_STATE');

const checkForDoublePins = createAction('CHECK_FOR_DOUBLE_PINS');
const setPinnedPieces = createAction('SET_PINNED_PIECES');
const clearPinnedPieces = createAction('CLEAR_PINNED_PIECES');

export const syncDatabaseWithState = createAsyncThunk('syncDatabaseWithState', updateDatabaseWithState)       /* this is where i left off, i need to test this out and the createMatch endpoint in node,js*/
export const syncStateWithDatabase = createAsyncThunk('syncStateWithDatabase', updateStateWithDatabase);

const initialState = { 
    board:  [
      ['black rook a', 'black knight b', 'black bishop c', 'black queen d', 'black king e', 'black bishop f', 'black knight g', 'black rook h'],
      ['black pawn a', 'black pawn b', 'black pawn c', 'black pawn d', 'black pawn e', 'black pawn f', 'black pawn g', 'black pawn h'],      
      ['', '', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '', '',],
      ['white pawn a', 'white pawn b', 'white pawn c', 'white pawn d', 'white pawn e', 'white pawn f', 'white pawn g', 'white pawn h'],
      ['white rook a', 'white knight b', 'white bishop c', 'white queen d', 'white king e', 'white bishop f', 'white knight g', 'white rook h'], 
    ],
    legal_squares: [
      ['', '', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '', '',],      
      ['', '', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '', '',],
    ],
    moves: {
      all: [],
      black_pieces_taken: [],
      white_pieces_taken: [],
    },
    stalemate: {
        movesAvailableForWhite: ['white pawn a', 'white pawn b', 'white pawn c', 'white pawn d', 'white pawn e', 'white pawn f', 'white pawn g', 'white pawn h', 'white knight b', 'white knight g'],
        movesAvailableForBlack: ['black pawn a', 'black pawn b', 'black pawn c', 'black pawn d', 'black pawn e', 'black pawn f', 'black pawn g', 'black pawn h', 'black knight b', 'black knight g'],
        game_over: false
    },
    checkmate: {
      king_in_check: false,
      squares_between_king_and_attacker: [],
      game_over: false,
    },   

    time_traveling: {        
        past: [],
        future: [],
        stop_moves: false,
    },
    castleling: {
      has_king_been_moved: false,
      has_rooks_been_moved: [false, false]
    },   
    out_of_time: {
        player: '', 
        color: ''
    }, 
    current_turn: 'white',
    en_passant: null,
    resigns: false,
    forfeit: false,
    pinned_pieces: [],
    difficulty: '',
    pieceToBeMoved: {square: {row: null, column: null}},
  }

/* 
    THIS IS WHERE I LEFT OFF, i need to modularize some of the logic in this reducer, 
    i have refactored everything, but the file is still too long (1000 lines of code

    The reducer below has cases where it will LEGAL a group of squares, each LEGALed square will tell the player they can move their piece to that square
    
    Everything starts with the user clicking on one of their pieces on their side of the board.
    This event will trigger a dispatch method that will call the appropriate cases
        legalNorthSquares
        legalSouthSquares
        etc.. 

    1) If the player clicks on the bishop, the position of the bishop will be recorded in the pieceToBeMoved property of the global state

    2) Then it will trigger the following cases
          legalNorthWestSquares
          legalNorthEastSquares
          legalSouthWestSquares
          legalSouthEastSquares

    3) Before we LEGAL the squares, we check if the bishop is a pinned piece (ex: bishop may be in-between the opposing queen and its king)
       If its a pinned piece, then there are only a few legal squares the bishop can move to. Thereby limiting the movement of the bishop

          (Keep in mind, that everytime a piece has been moved, it will dispatch an action 'SET_PINNED_PIECES' that will find a pinned piece and save it in the pinned-pieces array)

    4) Before we LEGAL the squares, we also check if the king is in check. If the king is in check, the bishop will have a limited number
       of squares that it can move into. The bishop must either protect its king by blocking or taking the threat

    5) If the bishop is not a pinned piece, and its king is NOT in check, then the bishop can move freely to any of its LEGALed squares

    6) If the player clicks on one of the LEGALed squares, the bishop can be moved to that square

    7) Before we actually move the bishop, we check if the new position of the bishop will unpin other pieces 
        (ex: bishop moves in-between black queen, white pawn, white king.... thereby unpinning the white pawn)

    8) Before we actually move the bishop, we check if the piece being moved is either a king or a rook, 
       and we record the first time these pieces have been moved
       The reason for this is because the rules of chess state that if a rook or king has been moved, the king wont be able to castle

    9) Before we actually move the bishop, we also check if the piece being moved is a pawn that took an opposing pawn with en-passant
       if so, then we implement the logic necessary for en-passant
       if not, the we disable en-passant

        (Keep in mind that when a pawn moves two squares forward, it will enable en-passant in the global state
        If the next move is a non-pawn piece or a piece that did not take with en-passant, then we disable en-passant)

    10) Before we actually move the bishop, we check if the piece being moved is a king that was castled
        If so, we move the rook and king to its correct position

    11) THEN WE FINALLY MOVE THE BISHOP
    
    12) We also record the move that was just made in the moves property of the global state


    Everytime there is a change in the board state, we dispatch an action 'IS_KING_IN_CHECK' within the <king/> component
    This action will help us verify if the king is in check
    If the king is in check, then we create an array 'squaresBetweenKingAndAttacker' that will contain all the squares between the threat and the king
      this array will force every piece to only move to a square that is within this array of legal squares

    Once we populate the 'squaresBetweenKingAndAttacker' array, then we check if any surrounding pieces can legally move to those squares to block and protect the king
    we also check if the piece, that is attacking the king, is under threat
    we also check if the king has any legal moves left

    If there are no legal moves left for the king, 
    no pieces to defend the king, 
    no threats to the attacker, 
    then its checkmate
  

*/

const ChessReducer = createReducer(initialState, (builder) => {      
  builder
    .addCase(movePiece, (state, action) => {    
      state.time_traveling.stop_moves = false;
      state.en_passant = null;
      const oldRow = state.pieceToBeMoved.square.row;
      const oldColumn = state.pieceToBeMoved.square.column; 
      const newRow = action.payload.square.row;
      const newColumn = action.payload.square.column;  
      const kingHasBeenMovedForFirstTime = !action.payload.hasKingBeenMoved;      //if the king hasnt been moved at this point, then this is the first time we are moving the king
      const rookHasBeenMovedForFirstTime = !action.payload.hasRookBeenMoved;      //if the rook hasnt been moved at this point, then this is the first time we are moving the rook
      const pieceToBeMoved = state.board[oldRow][oldColumn];
      const pieceToBeTaken = state.board[newRow][newColumn];
      //we record the piece that was taken
      if(pieceToBeTaken){
        const pieceColor = pieceToBeTaken.includes('white') ? 'white' : 'black';
        state.moves[`${pieceColor}_pieces_taken`]?.unshift(pieceToBeTaken); 
      }

      //this will check if the current piece being moved will unpin other pieces
      UnpinPieces(state, newRow, newColumn);                

      //this is what moves the piece on the board  
      state.board[oldRow][oldColumn] = '';                          
      state.board[newRow][newColumn] = pieceToBeMoved;
      state.current_turn = state.current_turn === 'white' ? 'black' : 'white';

      saveMove(state, {
          from: {row: oldRow, column: oldColumn}, 
          to: {row: newRow, column: newColumn}, 
          pieceToBeTaken: pieceToBeTaken, 
          pieceToBeMoved,
          rookHasBeenMovedForFirstTime,
          kingHasBeenMovedForFirstTime
        }
      )
      ResetProperties(state, initialState);
    })
    .addCase(movePieceWithAI, (state, action) => {
      const {bestMove} = action.payload.bestmove;
      const opponentColor = action.payload.opponentColor;
      state.en_passant = null;
      IntepretAIMoves(state, bestMove, opponentColor);
      state.current_turn = state.current_turn === 'white' ? 'black' : 'white';
      ResetProperties(state, initialState);
    })
    .addCase(playerRanOutOfTime, (state, action) => {
      state.out_of_time.player = action.payload.player;
      state.out_of_time.color = action.payload.color;
    })
    .addCase(implementCastleling, (state, action) => {
      state.time_traveling.stop_moves = false;
      state.en_passant = null;
      const castlelingSide = action.payload.castleling;
      const kingPosition = state.pieceToBeMoved.square;
      let newKingPosition;
      let pieceToBeMoved;
      let rookToBeCastled;

      if(castlelingSide === 'kingSide'){
        const kingPiece = state.board[kingPosition.row][kingPosition.column];   
        state.board[kingPosition.row][kingPosition.column] = '';                       
        state.board[kingPosition.row][kingPosition.column + 2] = kingPiece;
        newKingPosition = {row: kingPosition.row, column: kingPosition.column + 2};
        pieceToBeMoved = kingPiece;
        //this will check if the current piece being moved will unpin other pieces
        UnpinPieces(state, kingPosition.row, kingPosition.column + 2);   

        const rookPiece = state.board[kingPosition.row][7];
        state.board[kingPosition.row][7] = '';
        state.board[kingPosition.row][5] = rookPiece;
        rookToBeCastled = {
            from: {row: kingPosition.row, column: 7}, 
            to: {row: kingPosition.row, column: 5}, 
            piece: rookPiece, 
            side: 'kingSide'
          }
      }
      else{
        const kingPiece = state.board[kingPosition.row][kingPosition.column]; 
        state.board[kingPosition.row][kingPosition.column] = '';                       
        state.board[kingPosition.row][kingPosition.column - 2] = kingPiece;
        newKingPosition = {row: kingPosition.row, column: kingPosition.column - 2};
        pieceToBeMoved = kingPiece;
        //this will check if the current piece being moved will unpin other pieces
        UnpinPieces(state, kingPosition.row, kingPosition.column - 2);   

        const rookPiece = state.board[kingPosition.row][0];
        state.board[kingPosition.row][0] = '';
        state.board[kingPosition.row][3] = rookPiece;
        rookToBeCastled = {
          from: {row: kingPosition.row, column: 0}, 
          to: {row: kingPosition.row, column: 3}, 
          piece: rookPiece, 
          side: 'queenSide'
        }
      }

      state.current_turn = state.current_turn === 'white' ? 'black' : 'white';

      saveMove(state, {
        from: {row: kingPosition.row, column: kingPosition.column}, 
        to: {row: newKingPosition.row, column: newKingPosition.column}, 
        pieceToBeTaken: '', 
        pieceToBeMoved,
        castleling: rookToBeCastled,
      })
      ResetProperties(state, initialState);
    })
    .addCase(enableEnPassant, (state, action) => {
      const newRow = action.payload.square.row;
      const newColumn = action.payload.square.column;
      const oldRow = state.pieceToBeMoved.square.row;
      const oldColumn = state.pieceToBeMoved.square.column;
      const pieceToBeMoved = state.board[oldRow][oldColumn];
      state.en_passant = {row: newRow, column: newColumn};

      state.board[oldRow][oldColumn] = '';
      state.board[newRow][newColumn] = pieceToBeMoved;
      state.current_turn = state.current_turn === 'white' ? 'black' : 'white';
      
      saveMove(state, {
        from: {row: oldRow, column: oldColumn}, 
        to: {row: newRow, column: newColumn}, 
        pieceToBeTaken: '', 
        pieceToBeMoved,
      })
      ResetProperties(state, initialState);
    })
    .addCase(implementEnPassant, (state, action) => {
      const newRow = action.payload.square.row;
      const newColumn = action.payload.square.column;
      const oldRow = state.pieceToBeMoved.square.row;
      const oldColumn = state.pieceToBeMoved.square.column;
      const enPassantRow = state.en_passant.row;
      const enPassantColumn = state.en_passant.column;
      const pieceToBeMoved = state.board[oldRow][oldColumn];
      const pieceToBeTaken = state.board[enPassantRow][enPassantColumn];
      takeWithEnPassant(state, pieceToBeMoved, oldRow, oldColumn, newRow, newColumn);

      state.board[oldRow][oldColumn] = '';
      state.board[newRow][newColumn] = pieceToBeMoved;
      state.current_turn = state.current_turn === 'white' ? 'black' : 'white';

      saveMove(state, {
        from: {row: oldRow, column: oldColumn}, 
        to: {row: newRow, column: newColumn}, 
        pieceToBeTaken: '', 
        pieceToBeMoved,
        enPassant: {
              pieceToBeTaken, 
              row: enPassantRow, 
              column: enPassantColumn
          }
      })
      state.en_passant = null;
      ResetProperties(state, initialState);
    })
    .addCase(promotion, (state, action) => {
      const oldRow = state.pieceToBeMoved.square.row;
      const oldColumn = state.pieceToBeMoved.square.column;
      const newRow = action.payload.square.row;
      const newColumn = action.payload.square.column;

      const color = state.current_turn;

      const piece = action.payload.piece;     
      const pieceId = action.payload.pieceId;

      const id = pieceId[pieceId.length - 1];
      const uniqueId = {
        'a': 'z',
        'b': 'y',
        'c': 'x',
        'd': 'w',
        'e': 'm',
        'f': 'o',
        'g': 'q',
        'h': 'l',
      }

      const pieceToBeMoved = state.board[oldRow][oldColumn];
      state.board[oldRow][oldColumn] = '';
      const promotion = `${color} ${piece} ${uniqueId[id]}`
      const pieceToBeTaken = state.board[newRow][newColumn];
      state.board[newRow][newColumn] = promotion;
      state.current_turn = state.current_turn === 'white' ? 'black' : 'white';

      saveMove(state, {
        from: {row: oldRow, column: oldColumn}, 
        to: {row: newRow, column: newColumn}, 
        pieceToBeTaken, 
        pieceToBeMoved,
        promotion
      })
      ResetProperties(state, initialState);
    })
    .addCase(undo, (state) => {
      const move = state.time_traveling.past.pop();    
      state.moves.all.shift();
      if(!move){
        state.board = initialState.board;
        state.current_turn = 'white';
        return;
      }
      else{
        state.time_traveling.stop_moves = true;
        const from = move.from;
        const to = move.to;
        const enPassant = move.enPassant;
        const castleling = move.castleling;
        const rookHasBeenMovedForFirstTime = move.rookHasBeenMovedForFirstTime;
        const kingHasBeenMovedForFirstTime = move.kingHasBeenMovedForFirstTime;
        const pieceToBeMoved = move.pieceToBeMoved;
        const pieceToBeTaken = move.pieceToBeTaken;
        state.board[from.row][from.column] = pieceToBeMoved;
        state.board[to.row][to.column] = pieceToBeTaken;

        if(pieceToBeTaken || enPassant){
          const pieceColor = pieceToBeTaken.includes('white') ? 'white' : 'black';
          state.moves[`${pieceColor}_pieces_taken`].shift()
        }

        if(enPassant){
          const pieceToBeTaken = enPassant.pieceToBeTaken;
          state.board[enPassant.row][enPassant.column] = pieceToBeTaken;
          state.en_passant = {
              row: enPassant.row, 
              column: enPassant.column
          }
        }
          
        if(castleling){
          const side = castleling.side;
          state.board[castleling.from.row][castleling.from.column] = castleling.piece;
          state.board[castleling.to.row][castleling.to.column] = ''
          state.castleling[`has_king_been_moved`] = false;
          state.castleling[`has_rooks_been_moved`][side === 'kingSide' ? 1 : 0] = false
        }

        if(rookHasBeenMovedForFirstTime)
          state.castleling[`has_rooks_been_moved`][pieceToBeMoved[11] === 'a' ? 0 : 1] = false;
        
        if(kingHasBeenMovedForFirstTime)
          state.castleling[`has_king_been_moved`] = false;
        
        state.time_traveling.future.push(move);    
        state.current_turn = state.current_turn === 'white' ? 'black' : 'white';    
      }
      ResetProperties(state, initialState);
    })
    .addCase(redo, (state) => {
      const move = state.time_traveling.future.pop();
      if(!move) {
        state.time_traveling.stop_moves = false;
        return;
      }
      state.time_traveling.stop_moves = true;
      state.moves.all.unshift(move);
      const from = move.from;
      const to = move.to;
      const enPassant = move.enPassant;
      const castleling = move.castleling;
      const rookHasBeenMovedForFirstTime = move.rookHasBeenMovedForFirstTime;
      const kingHasBeenMovedForFirstTime = move.kingHasBeenMovedForFirstTime;
      const pieceToBeMoved = move.pieceToBeMoved;
      const pieceToBeTaken = move.pieceToBeTaken;
      const promotion = move.promotion;

      state.board[from.row][from.column] = '';
      state.board[to.row][to.column] = promotion ? promotion : pieceToBeMoved;
      
      if(pieceToBeTaken){
        const pieceColor = pieceToBeTaken.includes('white') ? 'white' : 'black';
        state.moves[`${pieceColor}_pieces_taken`]?.unshift(pieceToBeTaken);
      }
      
      if(enPassant){
        const pieceToBeTaken = state.board[enPassant.row][enPassant.column]
        state.board[enPassant.row][enPassant.column] = '';
        const pieceColor = pieceToBeTaken.includes('white') ? 'white' : 'black';
        state.moves[`${pieceColor}_pieces_taken`]?.unshift(pieceToBeTaken);
        state.en_passant = null;
      }
        
      if(castleling){
        const side = castleling.side;
        state.board[castleling.from.row][castleling.from.column] = '';
        state.board[castleling.to.row][castleling.to.column] = castleling.piece;
        state.castleling[`has_king_been_moved`] = true;
        state.castleling[`has_rooks_been_moved`][side === 'kingSide' ? 1 : 0] = true
      }

      if(rookHasBeenMovedForFirstTime)
          state.castleling[`has_rooks_been_moved`][pieceToBeMoved[11] === 'a' ? 0 : 1] = true
    
      if(kingHasBeenMovedForFirstTime)
          state.castleling[`has_king_been_moved`] = true;
      
      state.time_traveling.past.push(move);
      state.current_turn = state.current_turn === 'white' ? 'black' : 'white';
      ResetProperties(state, initialState);
    })
    .addCase(hasKingBeenMoved, (state, action) => {
      state.castleling.has_king_been_moved = action.payload.moved;
    })
    .addCase(hasRooksBeenMoved, (state, action) => {
      const whichRook = action.payload.whichRook;
      const moved = action.payload.moved;

      if(whichRook === 'king-side')
        state.castleling.has_rooks_been_moved[1] = moved;
      else
        state.castleling.has_rooks_been_moved[0] = moved;
    })
    .addCase(legalNorthSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const legalSquares = [];

      northSquares((i) => {
          if(state.board[i][column] === ''){
            legalSquares.push({row: i, column});
            return true;
          }
          else if(!state.board[i][column].includes(piece_color)){
            legalSquares.push({row: i, column})
            return false;
          }
          else
            return false;
      }, row)

        const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];  //we check to see if the current piece is a pinned piece
        
        if(pinnedPiece)
            findLegalMovesForPinnedPiece(state, pinnedPiece.legalPinnedMoves, legalSquares);
        else if(state.checkmate.squares_between_king_and_attacker.length)
            createLegalSquaresWhileInCheck(state, legalSquares);
        else{
          legalSquares.forEach((square) => {
            state.legal_squares[square.row][square.column] = true;
          })
        }
    })
    .addCase(legalSouthSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const legalSquares = [];

      southSquares((i) => {
        if(state.board[i][column] === ''){
          legalSquares.push({row: i, column});
          return true;
        }
          
        else if(!state.board[i][column].includes(piece_color)){
          legalSquares.push({row: i, column});
          return false;
        }
        else
          return false
      }, row)

      const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];   //we check to see if the current piece is a pinned piece
      
      if(pinnedPiece)
          findLegalMovesForPinnedPiece(state, pinnedPiece.legalPinnedMoves, legalSquares, legalSquares);

      else if(state.checkmate.squares_between_king_and_attacker.length)
          createLegalSquaresWhileInCheck(state, legalSquares, legalSquares);
      else{
        legalSquares.forEach((square) => {
          state.legal_squares[square.row][square.column] = true;
        })
      }
    })
    .addCase(legalWestSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const legalSquares = [];

      westSquares((i) => {
        if(state.board[row][i] === ''){
          legalSquares.push({row, column: i});;
          return true;
        }
          
        else if(!state.board[row][i].includes(piece_color)){
          legalSquares.push({row, column: i});
          return false;
        }
        else
          return false;
      }, column)

      const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0]; //we check to see if the current piece is a pinned piece
      
      if(pinnedPiece)
          findLegalMovesForPinnedPiece(state, pinnedPiece.legalPinnedMoves, legalSquares, legalSquares);

      else if(state.checkmate.squares_between_king_and_attacker.length)
          createLegalSquaresWhileInCheck(state, legalSquares, legalSquares);
      else{
        legalSquares.forEach((square) => {
          state.legal_squares[square.row][square.column] = true;
        })
      }
    })
    .addCase(legalEastSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const legalSquares = [];

      eastSquares((i) => {
        if(state.board[row][i] === ''){
          legalSquares.push({row, column: i});
          return true;
        }
        else if(!state.board[row][i].includes(piece_color)){
          legalSquares.push({row, column: i});
          return false;
        }
        else
          return false;
      }, column)

      const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];   //we check to see if the current piece is a pinned piece
      
      if(pinnedPiece)
          findLegalMovesForPinnedPiece(state, pinnedPiece.legalPinnedMoves, legalSquares, legalSquares);

      else if(state.checkmate.squares_between_king_and_attacker.length)
          createLegalSquaresWhileInCheck(state, legalSquares, legalSquares);
      else{
        legalSquares.forEach((square) => {
          state.legal_squares[square.row][square.column] = true;
        })
      }
    })
    .addCase(legalNorthWestSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const legalSquares = [];

      northWestSquares((i, j) => {
        if(state.board[i][j] === ''){
          legalSquares.push({row: i, column: j});
          return true;
        }
          
        else if(!state.board[i][j].includes(piece_color)){
          legalSquares.push({row: i, column: j});
          return false;
        }
        else
          return false;
      }, row, column)


      const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];  //we check to see if the current piece is a pinned piece
      
      if(pinnedPiece)
          findLegalMovesForPinnedPiece(state, pinnedPiece.legalPinnedMoves, legalSquares, legalSquares);

      else if(state.checkmate.squares_between_king_and_attacker.length)
          createLegalSquaresWhileInCheck(state, legalSquares, legalSquares);
      else{
        legalSquares.forEach((square) => {
          state.legal_squares[square.row][square.column] = true;
        })
      }
    })
    .addCase(legalNorthEastSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const legalSquares = [];

      northEastSquares((i, j) => {
        if(state.board[i][j] === ''){
          legalSquares.push({row: i, column: j});
          return true;
        }
          
        else if(!state.board[i][j].includes(piece_color)){
          legalSquares.push({row: i, column: j});
          return false;
        }
        else
          return false;
      }, row, column)


      const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];   //we check to see if the current piece is a pinned piece
      
      if(pinnedPiece)
          findLegalMovesForPinnedPiece(state, pinnedPiece.legalPinnedMoves, legalSquares, legalSquares);

      else if(state.checkmate.squares_between_king_and_attacker.length)
          createLegalSquaresWhileInCheck(state, legalSquares, legalSquares);
      else{
        legalSquares.forEach((square) => {
          state.legal_squares[square.row][square.column] = true;
        })
      }
    })
    .addCase(legalSouthWestSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const legalSquares = [];

      southWestSquares((i, j) => {
        if(state.board[i][j] === ''){
          legalSquares.push({row: i, column: j});
          return true;
        }
          
        else if(!state.board[i][j].includes(piece_color)){
          legalSquares.push({row: i, column: j});
          return false;
        }
        else
          return false;
      }, row, column)

      const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];    //we check to see if the current piece is a pinned piece
      if(pinnedPiece)
          findLegalMovesForPinnedPiece(state, pinnedPiece.legalPinnedMoves, legalSquares, legalSquares);

      else if(state.checkmate.squares_between_king_and_attacker.length)
          createLegalSquaresWhileInCheck(state, legalSquares, legalSquares);
      else{
        legalSquares.forEach((square) => {
          state.legal_squares[square.row][square.column] = true;
        })
      }
    })
    .addCase(legalSouthEastSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const legalSquares = [];

      southEastSquares((i, j) => {
        if(state.board[i][j] === ''){
          legalSquares.push({row: i, column: j});
          return true;
        }
        else if(!state.board[i][j].includes(piece_color)){
          legalSquares.push({row: i, column: j});
          return false;
        }
        else
          return false;
      }, row, column)

      const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];     //we check to see if the current piece is a pinned piece
      if(pinnedPiece)
          findLegalMovesForPinnedPiece(state, pinnedPiece.legalPinnedMoves, legalSquares, legalSquares);
      else if(state.checkmate.squares_between_king_and_attacker.length)
          createLegalSquaresWhileInCheck(state, legalSquares, legalSquares);
      else{
        legalSquares.forEach((square) => {
          state.legal_squares[square.row][square.column] = true;
        })
      }
    })
    .addCase(legalKingSquares, (state, action) => {
      const piece_color = action.payload.square.color;
      const row = action.payload.square.row;
      const column = action.payload.square.column;
      const legalSquares = [];

      let legalMoves = createLegalSquaresForKing(state, row, column, piece_color);

      for(let i = 0; i < legalMoves.length; i++){
          if(state.board[legalMoves[i].row]?.[legalMoves[i].column] === '')
            legalSquares.push(legalMoves[i]);
          else if(state.board[legalMoves[i].row]?.[legalMoves[i].column] && 
            !state.board[legalMoves[i].row]?.[legalMoves[i].column].includes(piece_color))
              legalSquares.push(legalMoves[i]);
      }

      createSquaresForCastleling(state, row, column, piece_color, legalSquares);

      legalSquares.forEach((square) => {
        const castleling = square.castleling;
        if(castleling)
          state.legal_squares[square.row][square.column] = castleling;
        else
          state.legal_squares[square.row][square.column] = true;
      })
    })
    .addCase(legalKnightSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const legalSquares = [];

      knightSquares((square) => {
        if(state.board[square.row]?.[square.column] === '')
          legalSquares.push(square);
        else if(state.board[square.row]?.[square.column] && 
            !state.board[square.row]?.[square.column].includes(piece_color))
              legalSquares.push(square); 

        return true;
      }, row, column)

      const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];
      
      if(pinnedPiece)
          findLegalMovesForPinnedPiece(state, pinnedPiece.legalPinnedMoves, legalSquares, legalSquares);

      else if(state.checkmate.squares_between_king_and_attacker.length)
          createLegalSquaresWhileInCheck(state, legalSquares, legalSquares);
      else{
        legalSquares.forEach((square) => {
          state.legal_squares[square.row][square.column] = 'blue';
        })
      }
    })
    .addCase(legalPawnSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const twoSquareMoveAvailable = action.payload.square.twoSquareMoveAvailable;

      const [legalSquares] = pawnSquares(state, row, column, piece_color, twoSquareMoveAvailable);
      
      const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];   //we check to see if the current piece is a pinned piece
      
      if(pinnedPiece)
          findLegalMovesForPinnedPiece(state, pinnedPiece.legalPinnedMoves, legalSquares, legalSquares);
      else if(state.checkmate.squares_between_king_and_attacker.length)
          createLegalSquaresWhileInCheck(state, legalSquares, legalSquares);
      else{
        legalSquares.forEach((square) => {
          if(square.enPassant)
            state.legal_squares[square.row][square.column] = square.enPassant
          else if(square.promotion)
            state.legal_squares[square.row][square.column] = 'promotion'
          else
            state.legal_squares[square.row][square.column] = true;
        })
      }
    })
    .addCase(removeAllLegalSquares, (state) => {
      state.legal_squares = initialState.legal_squares;
    })
    .addCase(isKingInCheck, (state, action) => {
      const row = action.payload.square.row;
      const column = action.payload.square.column;
      const piece_color = action.payload.square.color;
      const opposing_color = piece_color === 'white' ? 'black' : 'white';
      
      const [squares, king_in_check] = checkSquaresForCheck(state, row, column, piece_color)     //this function will check if the king is currently in check by traversing through the squares north, west, east, south and diagonally for threats
      state.checkmate.squares_between_king_and_attacker = squares;
      state.checkmate.king_in_check = king_in_check;
    
      if(!state.checkmate.king_in_check) return;

      const squares_between_king_and_attacker = state.checkmate.squares_between_king_and_attacker

      let isSquareBlockable = false;
      for(let i = 0; i < squares_between_king_and_attacker.length; i++){
        isSquareBlockable = checkSquaresForBlocks(state, squares_between_king_and_attacker[i], piece_color);
        if(isSquareBlockable)
          return; 
      }
      const attacker = squares_between_king_and_attacker[squares_between_king_and_attacker.length - 1]; 
      const attackerIsUnderThreat = checkSquaresForThreats(state, attacker, piece_color);
      const legalMoves = createLegalSquaresForKing(state, row, column, piece_color);
      
      if(!legalMoves.length && !attackerIsUnderThreat)
        state.checkmate.game_over = opposing_color;
    })
    .addCase(isOpposingKingInCheck, (state, action) => {
        const row = action.payload.square.row;
        const column = action.payload.square.column;
        const piece_color = action.payload.square.color;
        const opposing_color = piece_color === 'white' ? 'black' : 'white';

        const [squares, king_in_check] = checkSquaresForCheck(state, row, column, piece_color);

        if(!king_in_check) return;

        const squares_between_king_and_attacker = squares;

        let isSquareBlockable = false;
        for(let i = 0; i < squares_between_king_and_attacker.length; i++){
          isSquareBlockable = checkSquaresForBlocks(state, squares_between_king_and_attacker[i], piece_color);
          if(isSquareBlockable)
            return; 
        }

        const attacker = squares_between_king_and_attacker[squares_between_king_and_attacker.length - 1]; 
        const attackerIsUnderThreat = checkSquaresForThreats(state, attacker, piece_color);
        const legalMoves = createLegalSquaresForKing(state, row, column, piece_color);

        if(!legalMoves.length && !attackerIsUnderThreat)
          state.checkmate.game_over = opposing_color;

    })
    .addCase(pieceToBeMoved, (state, action) => {
      state.pieceToBeMoved = action.payload;
    })
    .addCase(checkForDoublePins, (state, action) => {    //i need to check for a specific type of pin, i will traverse through a file in the board and find the other king, i will see if there are threats within that file
      const row = action.payload.square.row;
      const column = action.payload.square.column;
      const piece_color = action.payload.square.color;
      CheckForDoublePin(state, {row, column}, piece_color);
    })
    .addCase(setPinnedPieces, (state, action) => {
      const square = action.payload.square;
      const color = square.color;
      const row = square.row;
      const column = square.column;
      const piece = state.board[row][column];
      findPinnedPieces(state, {row, column}, color, piece)
    })
    .addCase(clearPinnedPieces, (state, action) => {
      const row = action.payload.square.row;
      const column = action.payload.square.column;

      const pieceToRemove = state.board[row][column];
      state.pinned_pieces = state.pinned_pieces.filter(piece => piece.piece !== pieceToRemove);
    })
    .addCase(resigns, (state, action) => {
      const playerWhoResigned = action.payload.resigns;
      state.resigns = playerWhoResigned;
    })
    .addCase(countLegalMoves, (state, action) => {
      const color = action.payload.square.color;
      const row = action.payload.square.row;
      const column = action.payload.square.column;
      const piece = state.board[row][column];

      const pieceCanMove = legalMovesExist(state, piece, color, {row, column});

      if(pieceCanMove && !state.stalemate[`movesAvailableFor${color === 'white' ? 'White' : 'Black'}`].includes(piece))
        state.stalemate[`movesAvailableFor${color === 'white' ? 'White' : 'Black'}`].push(piece);
      else if(!pieceCanMove)
        state.stalemate[`movesAvailableFor${color === 'white' ? 'White' : 'Black'}`] = state.stalemate[`movesAvailableFor${color === 'white' ? 'White' : 'Black'}`].filter((move) => move !== piece)
    })
    .addCase(resetLegalMoves, (state, action) => {
        const color = action.payload.color === 'white' ? 'White' : 'Black';
        const piece = action.payload.pieceId;
      
        state.stalemate[`movesAvailableFor${color}`] = state.stalemate[`movesAvailableFor${color}`].filter((move) => move !== piece);
    })
    .addCase(checkStalemate, (state, action) => {
        const color = action.payload.square.color;
        const row = action.payload.square.row;
        const column = action.payload.square.column;      
        const movesAvailable = action.payload.movesAvailable;
        const legalSquaresForKing = createLegalSquaresForKing(state, row, column, color);
        const kingInCheck = state.checkmate.king_in_check;

        if(legalSquaresForKing.length === 0 && !kingInCheck && movesAvailable.length === 0)
          state.stalemate.game_over = true;
    })
    .addCase(resetState, (state) => {
      ResetState(state, initialState);
    })
    .addCase(updateState, (state, action) => {
      const newState = action.payload.state;
      ResetState(state, newState);
    })
    .addCase(syncDatabaseWithState.fulfilled, (state, action) => {
      const message = action.payload.message;
      console.log(message);
    })
    .addCase(syncDatabaseWithState.rejected, (state, action) => {
      const message = action.payload.message;
      const endpoint = action.payload.endpoint;
      const type = action.payload.type;
      if(type === 'internal')
        console.error(`Internal server error has occurred in this endpoint ${endpoint} `, message);
      else
        console.error(`Server went offline in this endpoint ${endpoint} `, message);
    })
    .addCase(syncStateWithDatabase.fulfilled, (state, action) => {
      const newState = action.payload.chess;
      ResetState(state, newState);
      console.log('state has been synchronized with database')
    })
    .addCase(syncStateWithDatabase.rejected, (state, action) => {
      const message = action.payload.message;
      const endpoint = action.payload.endpoint;
      const type = action.payload.type;
      if(type === 'internal')
        console.error(`Internal server error has occurred in this endpoint ${endpoint} `, message);
      else
        console.error(`Server went offline in this endpoint ${endpoint} `, message);
    })
});

export default ChessReducer;
