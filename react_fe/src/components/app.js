import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Cookies from 'universal-cookie';

import BaseLayout from '../components/baseLayout.js';

import '../styles/app.css';

const cookies = new Cookies();

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      jwt: cookies.get('jwt'),
      currentUser: cookies.get('currentUser'),
      error: null
    }
  }

  // TODO move this to a helper file?
  validateJWT(jwt) {
    fetch(this.props.backendURL + 'session/verify?jwt=' + jwt, {mode: 'cors'})
      .then(res => Promise.all([res, res.json()]))
      .then(([res, json]) => {
        if (res.ok) {
          cookies.set('jwt', json.jwt);
          cookies.set('currentUser', json.user); // TODO remove currentUser from cookies, just use jwt in cookies
          this.setState({currentUser: json.user, jwt: json.jwt, error: null})
        } else {
          throw new Error(json.message);
        }
      })
      .catch(err => {
        this.setState({error: err.message});
      });
  }

  render() {
    return (
      <Router>
        <BaseLayout error={this.state.error} />
      </Router>
    )
    // return (
    //   <div className='app-container'>
    //     <ErrorBanner errorMessage={this.state.error} />
    //     <Login clientId={this.props.clientId} jwt={this.state.jwt} validateJWT={(jwt) => this.validateJWT(jwt)} />
    //     <UserInfo user={this.state.currentUser} />
    //   </div>
    // );
  }
}

export default App;
