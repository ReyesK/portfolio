import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

import BaseLayout from '../components/baseLayout';

import '../styles/app.css';


class App extends React.Component {

  render() {
    return (
      <Router>
        <BaseLayout />
      </Router>
    );
  }
}

export default App;
