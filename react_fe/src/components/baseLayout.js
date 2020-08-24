import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import ProtectedRoute from '../components/protectedRoute';
import AuthService from '../services/authService';

import HomePage from '../views/home';
import LoginRequiredPage from '../views/loginRequired';
import ProfilePage from '../views/profile';
import POCPage from '../views/pocs';

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
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    const {error, ...response} = authResp;
    this.setState({serviceReplied: true, authData: response, error: error});
    this.props.history.push(from.pathname);
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
      {path: '/profile', page: ProfilePage}
    ];
  }

  // define any public routes here
  routes() {
    return [
      {path: '/', page: HomePage},
      {path: '/pocs', page: POCPage}
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
      <ProtectedRoute key={r.path} path='/profile' exact component={ProfilePage} {...protectedProps} />
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

        <div className='app-container'>
          {routesJSX}
          {protectedRoutesJSX}
          
          <Route path='/login' render={(props) =>
            this.state.authData.user ?
              <Redirect to='/' /> :
              <LoginRequiredPage {...props} /> } />
        </div>
      </div>
    );
  }
}

export default withRouter(BaseLayout);
