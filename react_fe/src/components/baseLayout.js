import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ProtectedRoute from '../components/protectedRoute';
import AuthService from '../services/authService';

import ErrorBanner from '../components/errorBanner';
import UserInfo from '../components/userInfo';
import Login from '../components/login';


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
        </header>

        <div className='app-container'>

          <ProtectedRoute path='/' exact component={UserInfo} {...protectedProps} />

          <Route path='/login' render={(props) =>
            this.state.authData.user ?
              <Redirect to='/' /> :
              <Login {...props} callback={(data) => this.loginCallback(data)} />}/>

        </div>
      </div>
    );
  }
}

export default BaseLayout
