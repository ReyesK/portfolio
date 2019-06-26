import React from 'react';
import { Route, Redirect } from 'react-router-dom';

class ProtectedRoute extends React.Component {

  render() {
    const { component: Component, serviceReplied, authenticated, user, ...rest } = this.props;
    if (!serviceReplied) {
      return null; // This prevents redirect to login before checking authenticated user.. maybe make a loading view component to render
    }
    return (
      <Route {...rest} render={props =>
        authenticated ?
          <Component {...props} user={user}/> :
          <Redirect to={{pathname: '/login', state: { from: props.location }}} />
      } />
    );
  }
}

export default ProtectedRoute;
