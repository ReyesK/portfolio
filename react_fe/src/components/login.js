import React from 'react';
import GoogleLogin from 'react-google-login';
import AuthService from '../services/authService.js';

class Login extends React.Component {
  // TODO redirect to / after successful login
  googleSuccess = (response) => {
    AuthService.validateJWT(response.tokenId);
  };

  googleFailure = (response) => {
    console.warn('check /etc/hosts and url in browser')
    console.error(response.error)
  }

  render() {
    return(
      <div className='login-container'>
        <h2 className='login-header'>Welcome, Login with google to continue.</h2>
        <div className='login-buttons'>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_API_KEY}
            buttonText="Login with Google"
            onSuccess={this.googleSuccess}
            onFailure={this.googleFailure}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>
    );
  }

}

export default Login;
