import React from 'react';
import ReactDOM from 'react-dom';
import Game from './classes/game.js'

import './index.css';

ReactDOM.render(
  <Game boardsize={3} />,
  document.getElementById('root')
)
