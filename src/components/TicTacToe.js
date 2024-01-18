import React, { useState } from 'react';

const generateSquares = () => {
 const squares = [];

 for (let i = 0; i < 3; i += 1) {
    squares.push([]);
    for (let j = 0; j < 3; j += 1) {
      squares[i].push(null);
    }
 }

 return squares;
};

const TicTacToe = () => {
 const [squares, setSquares] = useState(generateSquares());
 const [currentPlayer, setCurrentPlayer] = useState('X');
 const [winner, setWinner] = useState(null);

 const checkForWinner = () => {
    // All possible winning conditions
    const lines = [
      [0, 0, 0, 1, 0, 2],
      [1, 0, 1, 1, 1, 2],
      [2, 0, 2, 1, 2, 2],
      [0, 0, 1, 0, 2, 0],
      [0, 1, 1, 1, 2, 1],
      [0, 2, 1, 2, 2, 2],
      [0, 0, 1, 1, 2, 2],
      [0, 2, 1, 1, 2, 0],
    ];

    for (let i = 0; i < lines.length; i += 1) {
      const [a, b, c, d, e, f] = lines[i];
      if (
        squares[a][b] &&
        squares[a][b] === squares[c][d] &&
        squares[a][b] === squares[e][f]
      ) {
        return squares[a][b];
      }
    }

    return null;
 };

 const handleClick = (i, j) => {
    if (winner || squares[i][j]) return;

    const newSquares = [...squares];
    newSquares[i][j] = currentPlayer;
    setSquares(newSquares);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');

    const win = checkForWinner();
    if (win) setWinner(win);
 };

 const renderSquare = (i, j) => {
    return (
      <button
        className='bg-slate-400'
        type="button"
        onClick={() => handleClick(i, j)}
      >
        {squares[i][j]}
      </button>
    );
 };

 const resetGame = () => {
    setSquares(generateSquares());
    setCurrentPlayer('X');
    setWinner(null);
 };

 return (
    <div className="game">
      <div className="game-board">
        {squares.map((row, i) => (
          <div key={i} className="board-row bg-slate-700">
            {row.map((square, j) => renderSquare(i, j))}
          </div>
        ))}
      </div>
      <div className="game-info">
        <div>{winner ? `Winner: ${winner}` : `Current Player: ${currentPlayer}`}</div>
        <button type="button" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </div>
 );
};

export default TicTacToe;