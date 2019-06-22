import React from 'react';
import GoogleLogin from 'react-google-login';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jwt: this.props.jwt
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.jwt !== prevProps.jwt) {
      this.setState({jwt: this.props.jwt})
    }
  }

  googleSuccess = (response) => {
    this.props.validateJWT(response.tokenId);
  };

  googleFailure = (response) => {
    console.warn('check /etc/hosts and url in browser')
    console.error(response.error)
  }

  render() {
    if (this.state.jwt === undefined) {
      return(
        <div className='login-container'>
          <h2 className='login-header'>Welcome, Login with google to continue.</h2>
          <div className='login-buttons'>
            <GoogleLogin
              clientId={this.props.clientId}
              buttonText="Login with Google"
              onSuccess={this.googleSuccess}
              onFailure={this.googleFailure}
              cookiePolicy={'single_host_origin'}
            />
          </div>
        </div>
      )
    } else {
      return null;
    }
  }

}

export default Login;
