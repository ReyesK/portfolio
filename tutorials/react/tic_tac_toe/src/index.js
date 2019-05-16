import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    React.createElement('button', {className: 'square', onClick: props.onClick},
      props.value
    )
  );
}
const DEFAULTSTATE = {
  squares: Array(9).fill(null),
  xIsNext: true,
};

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
    const boardSize = 3 // TODO move to constant or make configurable by user... to an extent.. (limit 10 or so) (update win conditions accodringly)

    let board = [] // array to hold board rows
    for (let i = 0; i < boardSize; i++) {
      let squares = [] // array to hold squares for each row
      for(let x = 0; x < boardSize; x++) {
        const squareIdx = x + (boardSize*i) // get 'total' iteration count
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
  // TODO change this to be more dynamic if we allow more than 3x3
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ==================================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)
