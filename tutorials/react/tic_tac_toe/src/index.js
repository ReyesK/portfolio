import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component {
  render () {
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i}/>;
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
      board.push(<div className="board-row">{squares}</div>) // add row of squares to board
    }
    return board
  }

  render () {
    // modified from tutorial to be more DRY
    const status = 'Next player: X';
    return (
      <div>
        <div className="status">{status}</div>
        {this.renderBoard()}
      </div>
    );
  }
}

class Game extends React.Component {
  render () {
    return (
      <div className="game">
        <div className= "game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/*TODO*/}</ol>
        </div>
      </div>
    );
  }
}

// ==================================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)
