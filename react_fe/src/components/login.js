import React from 'react';
import GoogleLogin from 'react-google-login';
import AuthService from '../services/authService';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false
    };
  }

  googleSuccess = (response) => {
    AuthService.validateJWT(response.tokenId).then((authResp) => {
      if(authResp.valid) {
        this.props.callback(authResp);
      }
    });
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
