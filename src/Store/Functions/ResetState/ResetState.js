export const ResetState = (state, initialState) => {
    state.pieceToBeMoved = initialState.pieceToBeMoved;
    state.highlighted_squares = initialState.highlighted_squares;
    state.squares_between_king_and_attacker = initialState.squares_between_king_and_attacker;
    state.black_king_in_check = initialState.black_king_in_check;
    state.white_king_in_check = initialState.white_king_in_check;
  }
  