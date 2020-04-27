import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ProtectedRoute from '../components/protectedRoute';
import AuthService from '../services/authService';

import ErrorBanner from '../components/errorBanner';
import HomePage from '../components/homePage';
import LoginRequiredPage from '../components/loginRequiredPage';
import Profile from '../components/profile';
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
    const {error, ...response} = authResp;
    this.setState({serviceReplied: true, authData: response, error: error});
  }

  logoutCallback() {
    this.setState({serviceReplied: true, authData: {user: null}});
  }

  clearError() {
    this.setState({error: null});
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

    return (
      <div>
        <header>
            <ErrorBanner errorMessage={this.state.error} clearError={() => this.clearError()} />
            <NavigationBar user={this.state.authData.user}
                           logoutCallback={()=> this.logoutCallback()}
                           loginCallback={(data) => this.loginCallback(data)} />
        </header>

        <div className='app-container'>
          <Route path='/' exact render={(props) => <HomePage {...props} user={this.state.authData.user} /> } />
          <ProtectedRoute path='/profile' exact component={Profile} {...protectedProps} />

          <Route path='/login' render={(props) =>
            this.state.authData.user ?
              <Redirect to='/' /> :
              <LoginRequiredPage {...props} />}/>

        </div>
      </div>
    );
  }
}

export default BaseLayout
