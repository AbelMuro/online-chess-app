import {useMemo, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';


//this is where i left off, i will need to complete the logic implemented below
//pinnedSquares should contain all pinned pieces on the board, i will need to call this hook for every piece on the board
// and i need to call the dispatch function to pass the legalPinnedMoves array and the pinnedPieces to the reducer

function usePinnedPieces({row, column, color}) {
    const board = useSelector(state => state.chess.board);
    const [pinnedSquares, setPinnedSquares] = useState([]);

    useMemo(() => {
        if(!board[row][column].includes('queen') && !board[row][column].includes('rook')) return;

        const squaresBetweenKingAndAttacker = [];
        const legalPinnedMoves = [];
        const opposing_color = color === 'white' ? 'black' : 'white';
        let kingExists = false;

        for(let i = row + 1; i <= 7; i++){                        //north
            if(board[i][column].includes(color))
                return
            else if(board[i][column] === '')
                legalPinnedMoves.push({row: i, column});      
            
            else if(board[i][column] === `${opposing_color} king`){
                kingExists = true;
                break;
            }
            else if(!board[i][column].includes(color)){
                squaresBetweenKingAndAttacker.push({row: i, column})
                legalPinnedMoves.push({row: i, column});
            }
            else
              break; 
          }


        if(kingExists && squaresBetweenKingAndAttacker.length === 1)
            setPinnedSquares((prevSquares) => {
                return [...prevSquares, squaresBetweenKingAndAttacker[0]]
            })


    }, [board])


    useMemo(() => {
        if(!board[row][column].includes('queen') && !board[row][column].includes('rook')) return;

        const squaresBetweenKingAndAttacker = [];
        const legalPinnedMoves = [];
        const opposing_color = color === 'white' ? 'black' : 'white';
        let kingExists = false;

        for(let i = row - 1; i >= 0; i--){                        //south
            if(board[i][column].includes(color))
                return
            else if(board[i][column] === '')
                legalPinnedMoves.push({row: i, column});      
            
            else if(board[i][column] === `${opposing_color} king`){
                kingExists = true;
                break;
            }
            else if(!board[i][column].includes(color)){
                squaresBetweenKingAndAttacker.push({row: i, column})
                legalPinnedMoves.push({row: i, column});
            }
            else
              break; 
          }


        if(kingExists && squaresBetweenKingAndAttacker.length === 1)
            setPinnedSquares((prevSquares) => {
                return [...prevSquares, squaresBetweenKingAndAttacker[0]]
            })
    }, [board])


    useMemo(() => {
        if(!board[row][column].includes('queen') && !board[row][column].includes('rook')) return;

        const squaresBetweenKingAndAttacker = [];
        const legalPinnedMoves = [];
        const opposing_color = color === 'white' ? 'black' : 'white';
        let kingExists = false;

        for(let i = column - 1; i >= 0; i--){                        //west
            if(board[row][i].includes(color))
                return
            else if(board[row][i] === '')
                legalPinnedMoves.push({row, column: i});      
            
            else if(board[row][i] === `${opposing_color} king`){
                kingExists = true;
                break;
            }
            else if(!board[row][i].includes(color)){
                squaresBetweenKingAndAttacker.push({row, column: i})
                legalPinnedMoves.push({row, column: i});
            }
            else
              break; 
          }


        if(kingExists && squaresBetweenKingAndAttacker.length === 1)
            setPinnedSquares((prevSquares) => {
                return [...prevSquares, squaresBetweenKingAndAttacker[0]]
            })
    }, [board])

    useMemo(() => {
        if(!board[row][column].includes('queen') && !board[row][column].includes('rook')) return;

        const squaresBetweenKingAndAttacker = [];
        const legalPinnedMoves = [];
        const opposing_color = color === 'white' ? 'black' : 'white';
        let kingExists = false;

        for(let i = column + 1; i <= 7; i++){                        //east
            if(board[row][i].includes(color))
                return
            else if(board[row][i] === '')
                legalPinnedMoves.push({row, column: i});      
            
            else if(board[row][i] === `${opposing_color} king`){
                kingExists = true;
                break;
            }
            else if(!board[row][i].includes(color)){
                squaresBetweenKingAndAttacker.push({row, column: i})
                legalPinnedMoves.push({row, column: i});
            }
            else
              break; 
          }


        if(kingExists && squaresBetweenKingAndAttacker.length === 1)
            setPinnedSquares((prevSquares) => {
                return [...prevSquares, squaresBetweenKingAndAttacker[0]]
            })
    }, [board])


    useMemo(() => {
        if(!board[row][column].includes('queen') && !board[row][column].includes('bishop')) return;

        const squaresBetweenKingAndAttacker = [];
        const legalPinnedMoves = [];
        const opposing_color = color === 'white' ? 'black' : 'white';
        let kingExists = false;

        for(let i = row + 1, j = column - 1; i <= 7 && j >= 0; i++, j--){                        //north west
            if(board[i][j].includes(color))
                return
            else if(board[i][j] === '')
                legalPinnedMoves.push({row: i, column: j});      
            
            else if(board[i][j] === `${opposing_color} king`){
                kingExists = true;
                break;
            }
            else if(!board[i][j].includes(color)){
                squaresBetweenKingAndAttacker.push({row: i, column: j})
                legalPinnedMoves.push({row: i, column: j});
            }
            else
              break; 
          }


        if(kingExists && squaresBetweenKingAndAttacker.length === 1)
            setPinnedSquares((prevSquares) => {
                return [...prevSquares, squaresBetweenKingAndAttacker[0]]
            })
    }, [board])

    useMemo(() => {
        if(!board[row][column].includes('queen') && !board[row][column].includes('bishop')) return;

        const squaresBetweenKingAndAttacker = [];
        const legalPinnedMoves = [];
        const opposing_color = color === 'white' ? 'black' : 'white';
        let kingExists = false;

        for(let i = row + 1, j = column + 1; i <= 7 && j <= 7; i++, j++){                        //north east
            if(board[i][j].includes(color))
                return
            else if(board[i][j] === '')
                legalPinnedMoves.push({row: i, column: j});      
            
            else if(board[i][j] === `${opposing_color} king`){
                kingExists = true;
                break;
            }
            else if(!board[i][j].includes(color)){
                squaresBetweenKingAndAttacker.push({row: i, column: j})
                legalPinnedMoves.push({row: i, column: j});
            }
            else
              break; 
          }


        if(kingExists && squaresBetweenKingAndAttacker.length === 1)
            setPinnedSquares((prevSquares) => {
                return [...prevSquares, squaresBetweenKingAndAttacker[0]]
            })
    }, [board])


    useMemo(() => {
        if(!board[row][column].includes('queen') && !board[row][column].includes('bishop')) return;

        const squaresBetweenKingAndAttacker = [];
        const legalPinnedMoves = [];
        const opposing_color = color === 'white' ? 'black' : 'white';
        let kingExists = false;

        for(let i = row - 1, j = column - 1; i >= 0 && j >= 0; i--, j--){                        //south west
            if(board[i][j].includes(color))
                return
            else if(board[i][j] === '')
                legalPinnedMoves.push({row: i, column: j});      
            
            else if(board[i][j] === `${opposing_color} king`){
                kingExists = true;
                break;
            }
            else if(!board[i][j].includes(color)){
                squaresBetweenKingAndAttacker.push({row: i, column: j})
                legalPinnedMoves.push({row: i, column: j});
            }
            else
              break; 
          }


        if(kingExists && squaresBetweenKingAndAttacker.length === 1)
            setPinnedSquares((prevSquares) => {
                return [...prevSquares, squaresBetweenKingAndAttacker[0]]
            })
    }, [board])

    useMemo(() => {
        if(!board[row][column].includes('queen') && !board[row][column].includes('bishop')) return;

        const squaresBetweenKingAndAttacker = [];
        const legalPinnedMoves = [];
        const opposing_color = color === 'white' ? 'black' : 'white';
        let kingExists = false;

        for(let i = row - 1, j = column + 1; i >= 0 && j <= 7; i--, j++){                        //south east
            if(board[i][j].includes(color))
                return
            else if(board[i][j] === '')
                legalPinnedMoves.push({row: i, column: j});      
            
            else if(board[i][j] === `${opposing_color} king`){
                kingExists = true;
                break;
            }
            else if(!board[i][j].includes(color)){
                squaresBetweenKingAndAttacker.push({row: i, column: j})
                legalPinnedMoves.push({row: i, column: j});
            }
            else
              break; 
          }


        if(kingExists && squaresBetweenKingAndAttacker.length === 1)
            setPinnedSquares((prevSquares) => {
                return [...prevSquares, squaresBetweenKingAndAttacker[0]]
            })
    }, [board])

}

export default usePinnedPieces;