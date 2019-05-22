import React from 'react';
import Board from './board.js';
import HistoryBoard from './history-board.js'


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { // set default state
      history: [{
        squares: Array(this.props.boardsize * this.props.boardsize).fill(null),
        moveCoords: null,
      }],
      stepNumber: 0,
      xIsNext: true,
      sortMovesAscending: true,
    };
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const bSize = this.props.boardsize;
    if (calculateWinner(squares, bSize) || squares[i]) { // if winner or something already in a square do nothing
      return;
    }

    // calculate coords of picked square
    const col = (i % bSize) + 1; // +1 to make coords not 0 based
    const row = Math.floor(i / bSize) + 1;

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        moveCoords: {'col': col, 'row': row},
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  changeMoveListSort(currentSort) {
    this.setState({
      sortMovesAscending: !currentSort
    });
  }

  render () {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winnerData = calculateWinner(current.squares.slice(), this.props.boardsize);
    const winner = winnerData ? winnerData['winner'] : null;
    const status = winner ? 'Winner: ' + winner : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    let moves = history.map((step, move) => {
      return (
        <HistoryBoard
          boardsize={this.props.boardsize}
          onClick={()=> this.jumpTo(move)}
          squares={history[move].squares}
          moveCoords={step['moveCoords']}
          moveNumber={move}
          isCurrent={this.state.stepNumber===move}
        />
      )
    });

    moves = this.state.sortMovesAscending ? moves : moves.reverse(); // sort the moves in either ascending or descending order

    return (
      React.createElement('div', {className: 'game'},
        React.createElement('h1', {}, 'Tic Tac Toe'),
        React.createElement('div', {}, status),
        React.createElement('div', {className: 'game-board'},
          <Board
            squares={current.squares}
            onClick={(i)=> this.handleClick(i)}
            winners={winnerData ? winnerData['indices'] : []}
            boardsize={this.props.boardsize}
          />
        ),
        React.createElement('div', {className: 'game-info'},
          React.createElement('div', {className: 'history-container'}, moves),
          React.createElement('label', {className: 'sort-label', htmlFor: 'move-list-sort'},
            React.createElement('input',
              {className: 'move-sort', id: 'move-list-sort', type: 'checkbox',
              onChange: ()=> this.changeMoveListSort(this.state.sortMovesAscending)}),
            'Sort Move History Descending',
            React.createElement('span', {className: 'checkmark'}),
          ), // add toggle to sort move list
        ),
      )
    );
  }
}

function calculateWinner(squares, boardsize) {

  const boardMap = squares.reduce((acc, square, idx) => {

    const rowIdx = Math.floor(idx/boardsize) // determine row index
    if(!acc['horizontals'][rowIdx]) {
      acc['horizontals'][rowIdx] = [] // initialize row array if undefined
    }

    const colIdx = acc['horizontals'][rowIdx].length // column index based off row
    acc['horizontals'][rowIdx].push({square: square, index: idx}) // add square to row

    if (!acc['verticals'][colIdx]) {
      acc['verticals'][colIdx] = [] // initialize column array if undefined
    }
    acc['verticals'][colIdx].push({square: square, index: idx}) // add square to column

    if (rowIdx === colIdx) {
      acc['descDiagonal'].push({square: square, index: idx}) // add squares in descending diagonal range
    }

    if (colIdx === ((rowIdx - (boardsize-1)) * -1)) {
      acc['ascDiagonal'].push({square: square, index: idx}) // add squares in ascending diagonal range
    }
    return acc
  }, {horizontals: [], verticals: [], ascDiagonal: [], descDiagonal: []})


  let winner = null

  for (const key in boardMap) { // loop keys in boardMap
    if(key === 'horizontals' || key === 'verticals') { // if horiz or vert
      winner = boardMap[key].reduce((acc, group, idx) => { // need to check each row or column
        const firstSquare = group[0]['square']
        if (firstSquare && group.every((val) => val['square'] === firstSquare)) {
           acc = {winner: firstSquare, indices: group.map((g) => g['index'])}
        } // if all values are the same set winner
        return acc // return accumulator as winner
      }, winner)
    } else { // if diagonal we are dealing with a flat array
      const firstDiag = boardMap[key][0]['square']
      if (firstDiag && boardMap[key].every((val) => val['square'] === firstDiag)) {
        winner = {winner: firstDiag, indices: boardMap[key].map((g) => g['index'])} // if all values are the same set winner
      }
    }
  }

  if (!winner && !squares.some((square)=>{ return square === null})) { // ensure no squares are null
    return {winner: 'Draw', indices: []} // Return draw if all squares full
  }
  return winner;
}

export default Game;
