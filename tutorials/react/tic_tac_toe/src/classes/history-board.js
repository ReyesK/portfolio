import React from 'react';

function Square(props) { // return only a square with value
  const classNames = props.isLastMove ? 'square history-last-move-square' : 'square'
  return (
    React.createElement('div', {className: classNames}, props.value)
  );
}

class HistoryBoard extends React.Component {

  renderSquare(i, isLastMove) {
    return <Square key={i} value={this.props.squares[i]} isLastMove={isLastMove} />
  }

  renderBoard(size) {
    let board = [] // array to hold board rows
    for (let i = 0; i < size; i++) {
      let squares = [] // array to hold squares for each row
      for(let x = 0; x < size; x++) {
        const squareIdx = x + (size*i) // get 'total' iteration count
        const isLastMove = this.props.moveCoords ? (i === (this.props.moveCoords['row']-1)) && (x === (this.props.moveCoords['col']-1)) : false
        squares.push(this.renderSquare(squareIdx, isLastMove)) // add square to squares array
      }
      board.push(React.createElement('div', {className: 'board-row', key: 'board-row'+ i}, squares)) // add squares to board
    }
    return board
  }

  render () {
    const historyBoardClasses = this.props.isCurrent ? 'history-board current' : 'history-board'
    return (
      React.createElement('div', {className: historyBoardClasses},
        React.createElement('button', {onClick: ()=> this.props.onClick()},
          React.createElement('label', {}, this.props.description),
          this.renderBoard(this.props.boardsize),
        )
      )
    );
  }
}

export default HistoryBoard
