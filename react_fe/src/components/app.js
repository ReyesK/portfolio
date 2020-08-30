import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

import BaseLayout from '../components/baseLayout';

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
