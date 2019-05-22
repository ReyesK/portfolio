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
    const moveNum = this.props.moveNumber
    const moveCoords = this.props.moveCoords

    let historyBoardClasses = 'history-board'
    let descrip = moveCoords ?
      'Go to move #' + moveNum + ' (' + moveCoords['col'] + ',' + moveCoords['row'] + ')' :
      'Go to game start'
    if (this.props.isCurrent) {
      historyBoardClasses += ' current'
      descrip = React.createElement('b', {}, descrip)
    }
    return (
      React.createElement('div', {className: historyBoardClasses},
        React.createElement('button', {onClick: ()=> this.props.onClick()},
          React.createElement('label', {}, descrip),
          this.renderBoard(this.props.boardsize),
        )
      )
    );
  }
}

export default HistoryBoard
