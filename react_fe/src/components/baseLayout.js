import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ProtectedRoute from '../components/protectedRoute';
import AuthService from '../services/authService';

import ErrorBanner from '../components/errorBanner';
import UserInfo from '../components/userInfo';
import Login from '../components/login';


class BaseLayout extends React.Component {
  // TODO check errors, probably needs refactoring
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
      this.setState({authData: response, serviceReplied: true})
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.error !== prevProps.error) {
      this.setState({error: this.props.error});
    }
  }

  loginCallback(authResp) {
    this.setState({serviceReplied: true, authData: authResp});
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
            <ErrorBanner errorMessage={this.state.error} />
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
