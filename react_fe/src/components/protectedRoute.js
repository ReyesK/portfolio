import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../services/authService.js';

class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedAuth: false,
      authData: {valid: false}
    }
  }

  componentDidMount() {
    AuthService.userFromJWTCookie().then((response) =>
      this.setState({authData: response, checkedAuth: true})
    );
  }

  render() {
    const { component: Component, ...rest } = this.props;
    if (!this.state.checkedAuth) {
      return null; // This prevents redirect to login before checking authenticated user.. maybe make a loading view component to render
    }
    return (
      <Route {...rest} render={props =>
        this.state.authData.valid ?
          <Component {...props} user={this.state.authData.user} /> :
          <Redirect to={{pathname: '/login', state: { from: props.location }}} />
      } />
    );
  }
}

export default ProtectedRoute;
