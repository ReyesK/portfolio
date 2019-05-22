import React from 'react';

function Square(props) { // function to return button for square
  return (
    React.createElement('button',
      {className: 'square ' + props.isWinningSquare, onClick: props.onClick},
      props.value
    )
  );
}

class Board extends React.Component {

  renderSquare(i, isWinningSquare) {
    return <Square key={i} value={this.props.squares[i]} onClick={()=> this.props.onClick(i)} isWinningSquare={isWinningSquare}/>
  }

  renderBoard(size) {
    let board = [] // array to hold board rows
    for (let i = 0; i < size; i++) {
      let squares = [] // array to hold squares for each row
      for(let x = 0; x < size; x++) {
        const squareIdx = x + (size*i) // get 'total' iteration count
        const winners = this.props.winners ? this.props.winners : []
        const winning = winners.includes(squareIdx) ? 'winning-square' : '' // if square is used in a winning combo we highlight it by adding a class.
        squares.push(this.renderSquare(squareIdx, winning)) // add square to squares array
      }
      board.push(React.createElement('div', {className: 'board-row', key: 'board-row'+ i}, squares)) // add squares to board
    }
    return board
  }

  render () {
    return (
      React.createElement('div', {}, this.renderBoard(this.props.boardsize))
    );
  }
}

export default Board
