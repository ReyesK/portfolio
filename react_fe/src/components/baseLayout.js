import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import ProtectedRoute from '../components/protectedRoute';
import AuthService from '../services/authService';


import * as Views from '../views';

import ErrorBanner from '../components/errorBanner';
import NavigationBar from '../components/navigationBar';


class BaseLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      serviceReplied: false,
      authData: {valid: false, user: null}
    };
  }

  componentDidMount() {
    AuthService.userFromJWTCookie().then((response) =>
      this.setState({serviceReplied: true, authData: response, error: response.error})
    );
  }

  loginCallback(authResp) {
    let from = this.props.location.pathname || "/";
    const {error, ...response} = authResp;
    this.setState({serviceReplied: true, authData: response, error: error});
    this.props.history.push(from);
  }

  logoutCallback() {
    this.setState({serviceReplied: true, authData: {user: null}});
    this.props.history.push('/');
  }

  clearError() {
    this.setState({error: null});
  }


  // define protected routes here
  protectedRoutes() {
    return [
      {path: '/profile', page: Views.Profile}
    ];
  }

  // define any public routes here
  routes() {
    return [
      {path: '/', page: Views.Home},
      {path: '/pocs', page: Views.POC},
      {path: '/pocs/api', page: Views.API},
      {path: '/pocs/react_frontend', page: Views.ReactFrontend},
      {path: '/pocs/node_backend', page: Views.NodeBackend},
    ];
  }

  render () {
    const protectedProps = {
      serviceReplied: this.state.serviceReplied,
      authenticated: this.state.authData.valid,
      user: this.state.authData.user
    }

    if (!this.state.serviceReplied) {
      return null;
    }

    const protectedRoutesJSX = this.protectedRoutes().map((r) =>
      <ProtectedRoute key={r.path} path={r.path} exact component={r.page} {...protectedProps} />
    );

    const routesJSX = this.routes().map((r) =>
      <Route key={r.path} path={r.path} exact render={(props) => <r.page {...props} user={this.state.authData.user} /> } />
    );

    return (
      <div>
        <header>
            <ErrorBanner errorMessage={this.state.error} clearError={() => this.clearError()} />
            <NavigationBar user={this.state.authData.user}
                           logoutCallback={()=> this.logoutCallback()}
                           loginCallback={(data) => this.loginCallback(data)} />
        </header>

        <div>
          {routesJSX}
          {protectedRoutesJSX}

          <Route path='/login' render={(props) =>
            this.state.authData.user ?
              <Redirect to='/' /> :
              <Views.LoginRequired {...props} /> } />
        </div>
      </div>
    );
  }
}

export default withRouter(BaseLayout);
