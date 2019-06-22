import React from 'react';
import GoogleLogin from 'react-google-login';
import Cookies from 'universal-cookie';

import ErrorBanner from '../components/errorBanner.js'

import '../styles/app.css';

const cookies = new Cookies();

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      jwt: cookies.get('jwt'),
      currentUser: cookies.get('currentUser'),
      error: null
    }
  }

  googleSuccess = (response) => {
    this.validateJWT(response.tokenId);
  };

  googleFailure = (response) => {
    console.warn('check /etc/hosts and url in browser')
    console.error(response.error)
  }

  validateJWT(jwt) {
    fetch(this.props.backendURL + 'session/verify?jwt=' + jwt, {mode: 'cors'})
      .then(res => Promise.all([res, res.json()]))
      .then(([res, json]) => {
        if (res.ok) {
          cookies.set('jwt', json.jwt);
          cookies.set('currentUser', json.user); // TODO remove currentUser from cookies, just use jwt in cookies
          this.setState({currentUser: json.user, jwt: json.jwt, error: null})
        } else {
          throw new Error(json.message);
        }
      })
      .catch(err => {
        this.setState({error: err.message});
      });
  }

  renderLogin() {
    let login = null;
    if (this.state.jwt === undefined) {
      login =
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
    }
    return login;
  }

  renderUserInfo() {
    let info = null;
    if (this.state.currentUser) {
      const user = this.state.currentUser;
      let userInfo = []
      for(let k in user) {
        if (k !== 'picture') {
          userInfo.push(<p key={'user-' + k}>{k}: {user[k]}</p>)
        }
      }

      info = <div className='user-container'>
        <div className='user-heading'>
          <img src={user.picture} alt='user' className='user-image' />
          <h2>Hello, {user.givenName}</h2>
        </div>
        <h5>We have fetched this data about you</h5>
        <div className='user-info'>
          {userInfo}
        </div>
      </div>
    }
    return info;
  }

  render() {
    return (
      // TODO refactor renderLogin and renderUserInfo to separate components
      <div className='app-container'>
        <ErrorBanner errorMessage={this.state.error} />
        {this.renderLogin()}
        {this.renderUserInfo()}
      </div>
    );
  }
}

export default App;
