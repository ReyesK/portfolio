import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

import BaseLayout from '../components/baseLayout';

import '../styles/app.css';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null
    }
  }

  render() {
    return (
      <Router>
        <BaseLayout error={this.state.error} />
      </Router>
    );
  }
}

export default App;
