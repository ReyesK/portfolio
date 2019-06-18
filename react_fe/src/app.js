import React from 'react';
import GoogleLogin from 'react-google-login';
import Cookies from 'universal-cookie';

import './app.css';

const cookies = new Cookies();

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      jwt: cookies.get('jwt'),
      currentUser: cookies.get('currentUser') // TODO get currentuser data from service
    }
  }

  googleSuccess = (response) => {
    const currentUser = googleDataFromResponse(response);
    this.validateJWT(response.tokenId);
    cookies.set('currentUser', currentUser)
    this.setState({currentUser: currentUser})
  };

  googleFailure = (response) => {
    console.warn('check /etc/hosts and url in browser')
    console.error(response.error);
  }

  validateJWT(jwt) {
    // TODO call backend validation
    fetch(this.props.backendURL + 'session', {
        mode: 'cors'
    })
      .then(res => res.text())
      .then(res => {
        cookies.set('jwt', res);
        this.setState({jwt: res});
      }
      );
  }

  renderLogin() {
    let login = null;
    if (this.state.jwt === undefined) {
      login = <GoogleLogin
        clientId={this.props.clientId}
        buttonText="Login with Google"
        onSuccess={this.googleSuccess}
        onFailure={this.googleFailure}
        cookiePolicy={'single_host_origin'}
      />
    }
    return login;
  }

  renderUserInfo() {
    let info = null;
    if (this.state.currentUser) {
      const user = this.state.currentUser;
      let userInfo = []
      for(let k in user) {
        if (k !== 'imageUrl') {
          userInfo.push(<li key={'user-' + k}>{user[k]}</li>)
        }
      }

      info = <div className='user-container'>
        <img src={user.imageUrl} alt='user' className='user-image' />
        <ul>
          {userInfo}
        </ul>
      </div>
    }
    return info;
  }

  render() {
    return (
      <div className='app-container'>
        <div className='login-container'>
          {this.renderLogin()}
          {this.renderUserInfo()}
        </div>
      </div>
    );
  }
}

function googleDataFromResponse(response) {
  const profile = response.profileObj
  return {
    accessToken: response.accessToken,
    googleId: response.googleId,
    jwt: response.tokenId,
    email: profile.email,
    first: profile.givenName,
    last: profile.familyName,
    imageUrl: profile.imageUrl,
  }
}

export default App;
