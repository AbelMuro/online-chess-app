import React from 'react';

const CreateSquaresForChessboard = (userColor, Squares, ) => {
        const squares = [];
        const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

        if(userColor === 'white')
            for (let row = 0; row <= 7; row++) { 
                const alternate = row % 2 === 0
                for (let column = 0; column <= 7; column++) { 
                    let square;
                    const currentColumn = columns[column];
                    const id = `${currentColumn}${row + 1}`

                    if(alternate)
                        square = column % 2 === 0 ? 'lightSquare' : 'darkSquare';
                    else
                        square = column % 2 !== 0 ? 'lightSquare' : 'darkSquare';
                        
                    squares.push( 
                        React.createElement(Squares, {
                            colorOfSquare: square,
                            row: row,
                            column: column,
                            id: id,
                            key: id
                        })
                    ); 
                }        
            }
        else
            for (let row = 7; row >= 0; row--) { 
                const alternate = row % 2 === 0
                for (let column = 0; column <= 7; column++) { 
                    let square;
                    const currentColumn = columns[column];
                    const id = `${currentColumn}${row + 1}`

                    if(alternate)
                        square = column % 2 === 0 ? 'lightSquare' : 'darkSquare';
                    else
                        square = column % 2 !== 0 ? 'lightSquare' : 'darkSquare';
                        
                    squares.push( 
                        React.createElement(Squares, {
                            colorOfSquare: square,
                            row: row,
                            column: column,
                            id: id,
                            key: id
                        })
                    ); 
                }        
            }
        return squares;
}

export default CreateSquaresForChessboard;