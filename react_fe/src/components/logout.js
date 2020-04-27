import React from 'react';

import AuthService from '../services/authService';
import { GoogleLogout } from 'react-google-login';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.setState({user: this.props.user})
    }
  }

  googleLoggedOut = (response) => {
    AuthService.logout();
    this.props.callback();
  }

  render(){
    if (this.props.user){
      return(
        <span className='session-button-container'>
            <GoogleLogout
              clientId={process.env.REACT_APP_GOOGLE_API_KEY}
              buttonText='Logout'
              onLogoutSuccess={this.googleLoggedOut}
            >
            </GoogleLogout>
        </span>
      )
    } else {
      return null;
    }
  }
}


export default Logout;
