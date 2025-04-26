export const ResetProperties = (state, initialState) => {
    state.pieceToBeMoved = initialState.pieceToBeMoved;
    state.legal_squares = initialState.legal_squares;
    state.checkmate.squares_between_king_and_attacker = initialState.checkmate.squares_between_king_and_attacker;
    state.checkmate.king_in_check = initialState.checkmate.king_in_check;
  }

  export const ResetState = (state, initialState) => {
    state.board = initialState.board;
    state.legal_squares = initialState.legal_squares;
    state.moves = initialState.moves;                  
    state.movesAvailableForWhite = initialState.movesAvailableForWhite;
    state.movesAvailableForBlack = initialState.movesAvailableForBlack;
    state.stalemate = initialState.stalemate;
    state.time_traveling.past = initialState.time_traveling.past;
    state.time_traveling.future =  initialState.time_traveling.future;
    state.time_traveling.stop_moves = initialState.time_traveling.stop_moves
    state.checkmate.king_in_check = initialState.checkmate.king_in_check;

    state.castleling.has_king_been_moved =  initialState.castleling.has_king_been_moved;
    state.castleling.has_rooks_been_moved = initialState.castleling.has_rooks_been_moved;
    state.black_pieces_taken = initialState.black_pieces_taken,
    state.white_pieces_taken = initialState.white_pieces_taken,
    
    state.checkmate.squares_between_king_and_attacker = initialState.checkmate.squares_between_king_and_attacker;
    state.pinned_pieces = initialState.pinned_pieces;
    state.resigns = initialState.resigns;
    state.checkmate.game_over = initialState.checkmate.game_over;
    state.user_color = initialState.user_color;
    state.opponent_color = initialState.opponent_color;
    state.current_turn =  initialState.current_turn;
    state.en_passant = initialState.en_passant;
    state.pieceToBeMoved =  initialState.pieceToBeMoved;
  }
  