import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const BOARDSIZE = 3

const DEFAULTSTATE = {
  squares: Array(BOARDSIZE * BOARDSIZE).fill(null),
  xIsNext: true,
};


function Square(props) {
  return (
    React.createElement('button', {className: 'square', onClick: props.onClick},
      props.value
    )
  );
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = DEFAULTSTATE
  }

  boardReset() {
    this.setState(DEFAULTSTATE)
  }

  handleClick(i){
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) { // if winner or something already in a square do nothing
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={()=> this.handleClick(i)}/>
  }

  renderBoard() {

    let board = [] // array to hold board rows
    for (let i = 0; i < BOARDSIZE; i++) {
      let squares = [] // array to hold squares for each row
      for(let x = 0; x < BOARDSIZE; x++) {
        const squareIdx = x + (BOARDSIZE*i) // get 'total' iteration count
        squares.push(this.renderSquare(squareIdx)) // add square to squares array
      }
      board.push(React.createElement('div', {className: 'board-row'}, squares))
    }
    return board
  }

  render () {
    // modified from tutorial to be more DRY
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      React.createElement('div', {},
        React.createElement('div', {className: 'status'},
          status,
          this.renderBoard(),
          React.createElement('button', {onClick: ()=> this.boardReset()}, 'Reset'),
        )
      )
    );
  }
}

class Game extends React.Component {
  render () {
    return (
      React.createElement('div', {className: 'game'},
        React.createElement('div', {className: 'game-board'},
          <Board />
        ),
        React.createElement('div', {className: 'game-info'},
          React.createElement('div', {}), // TODO
          React.createElement('ol', {}) // TODO
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

  for (let key in boardMap) {
    if(key === 'horizontals' || key === 'verticals') {
      winner = boardMap[key].reduce((acc, group, idx) => {
        if (group[0] && group.every((val) => val === group[0])) { acc = group[0] }
        return acc
      }, winner)
    } else {
      const firstDiag = boardMap[key][0]
      if (firstDiag && boardMap[key].every((val) => val === firstDiag)) { winner = firstDiag}
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
