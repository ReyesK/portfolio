import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/protectedRoute.js';
import AuthService from '../services/authService.js';

import ErrorBanner from '../components/errorBanner.js';
import UserInfo from '../components/userInfo.js';
import Login from '../components/login.js';


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

  render () {
    const protectedProps = {
      serviceReplied: this.state.serviceReplied,
      authenticated: this.state.authData.valid,
      user: this.state.authData.user
    }
    return (
      <div>
        <header>
            <ErrorBanner errorMessage={this.state.error} />
        </header>

        <div className='app-container'>
          <ProtectedRoute path='/' exact component={UserInfo} {...protectedProps} />
          <ProtectedRoute path='/dashboard' component={UserInfo} {...protectedProps} />
          <Route path='/login' component={Login} />
        </div>
      </div>
    );
  }
}

export default BaseLayout
