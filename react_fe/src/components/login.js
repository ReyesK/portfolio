import React from 'react';

import AuthService from '../services/authService';
import { GoogleLogin } from 'react-google-login';


class Login extends React.Component {

  googleSuccess = (response) => {
    AuthService.validateJWT(response.tokenId).then((authResp) => {
      this.props.callback(authResp);
    });
  };

  googleFailure = (response) => {
    console.warn('check /etc/hosts and url in browser')
    console.error(response.error)
  }

  render() {
    return (
      <span className='session-button-container'>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_API_KEY}
          buttonText="Login with Google"
          onSuccess={this.googleSuccess}
          onFailure={this.googleFailure}
          cookiePolicy={'single_host_origin'}
        />
      </span>
    );
  }

}

export default Login;
