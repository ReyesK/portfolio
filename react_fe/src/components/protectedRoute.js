import React from 'react';
import { Route, Redirect } from 'react-router-dom';

class ProtectedRoute extends React.Component {

  render() {
    const { component: Component, authenticated, user, ...rest } = this.props;

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
