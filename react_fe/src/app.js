import React from 'react';
import logo from './logo.svg';
import './app.css';

function App() {
  return (
    React.createElement('div', {className: 'app'},
      React.createElement('header', {className: 'app-header'},
        React.createElement('img', {className: 'app-logo', src: logo, alt: 'logo'}),
        React.createElement('p', {}, 'Edit <code>src/App.js</code> and save to reload.'),
        React.createElement('a', {
            className: 'app-link', href: 'https://reactjs.org',
            target: '_blank', rel: 'noopener noreferrer'
        }, 'Learn React')
      )
    )
  );
}

export default App;
