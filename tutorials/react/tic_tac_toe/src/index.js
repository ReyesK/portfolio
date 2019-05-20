import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const BOARDSIZE = 3

const DEFAULTSTATE = {
  history: [{
    squares: Array(BOARDSIZE * BOARDSIZE).fill(null),
    moveCoords: null,
  }],
  stepNumber: 0,
  xIsNext: true,
  sortMovesAscending: true,
};


function Square(props) {
  return (
    React.createElement('button', {className: 'square', onClick: props.onClick},
      props.value
    )
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return <Square key={i} value={this.props.squares[i]} onClick={()=> this.props.onClick(i)}/>
  }

  renderBoard() {

    let board = [] // array to hold board rows
    for (let i = 0; i < BOARDSIZE; i++) {
      let squares = [] // array to hold squares for each row
      for(let x = 0; x < BOARDSIZE; x++) {
        const squareIdx = x + (BOARDSIZE*i) // get 'total' iteration count
        squares.push(this.renderSquare(squareIdx)) // add square to squares array
      }
      board.push(React.createElement('div', {className: 'board-row', key: 'board-row'+ i}, squares))
    }
    return board
  }

  render () {
    return (
      React.createElement('div', {}, this.renderBoard())
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULTSTATE
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) { // if winner or something already in a square do nothing
      return;
    }

    // calculate coords of picked square
    const col = (i % BOARDSIZE) + 1; // +1 to make coords not 0 based
    const row = Math.floor(i / BOARDSIZE) + 1;

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
    const winner = calculateWinner(current.squares.slice());
    const status = winner ? 'Winner: ' + winner : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    let moves = history.map((step, move) => {
      let descrip = move ?
        'Go to move #' + move + ' (' + step['moveCoords']['col'] + ',' + step['moveCoords']['row'] + ')' :
        'Go to game start'
      if (this.state.stepNumber === move){ // Bold the currently selected item in the move list
        descrip = React.createElement('b', {}, descrip)
      }
      return (
        React.createElement('li', {key: move},
          React.createElement('button', {onClick: ()=> this.jumpTo(move)}, descrip)
        )
      )
    });

    moves = this.state.sortMovesAscending ? moves : moves.reverse(); // sort the moves in either ascending or descending order

    return (
      React.createElement('div', {className: 'game'},
        React.createElement('div', {className: 'game-board'},
          <Board
            squares={current.squares}
            onClick={(i)=> this.handleClick(i)}
          />
        ),
        React.createElement('div', {className: 'game-info'},
          React.createElement('div', {}, status),
          React.createElement('ol', {}, moves),
          React.createElement('input',
            {className: 'move-sort', id: 'move-list-sort', type: 'checkbox',
            onChange: ()=> this.changeMoveListSort(this.state.sortMovesAscending)}),
          React.createElement('label', {for: 'move-list-sort'}, 'Sort Move List Descending') // add toggle to sort move list
        )
      )
    );
  }
}

function calculateWinner(squares) {

  const boardMap = squares.reduce((acc, square, idx) => {

    const rowIdx = Math.floor(idx/BOARDSIZE) // determine row index
    if(!acc['horizontals'][rowIdx]) {
      acc['horizontals'][rowIdx] = [] // initialize row array if undefined
    }

    const colIdx = acc['horizontals'][rowIdx].length // column index based off row
    acc['horizontals'][rowIdx].push(square) // add square to row

    if (!acc['verticals'][colIdx]) {
      acc['verticals'][colIdx] = [] // initialize column array if undefined
    }
    acc['verticals'][colIdx].push(square) // add square to column

    if (rowIdx === colIdx) {
      acc['descDiagonal'].push(square) // add squares in descending diagonal range
    }

    if (colIdx === ((rowIdx - (BOARDSIZE-1)) * -1)) {
      acc['ascDiagonal'].push(square) // add squares in ascending diagonal range
    }
    return acc
  }, {'horizontals': [], 'verticals': [], 'ascDiagonal': [], 'descDiagonal': []})


  let winner = null

  for (let key in boardMap) { // loop keys in boardMap
    if(key === 'horizontals' || key === 'verticals') { // if horiz or vert
      winner = boardMap[key].reduce((acc, group, idx) => { // need to check each row or column
        if (group[0] && group.every((val) => val === group[0])) { acc = group[0] } // if all values are the same set winner
        return acc // return accumulator as winner
      }, winner)
    } else { // if diagonal we are dealing with a flat array
      const firstDiag = boardMap[key][0]
      if (firstDiag && boardMap[key].every((val) => val === firstDiag)) { winner = firstDiag} // if all values are the same set winner
    }
  }

  if (!winner && !squares.some((square)=>{ return square === null})) { // ensure no squares are null
    return 'Draw' // Return draw if all squares full
  }
  return winner;
}

// ==================================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)
