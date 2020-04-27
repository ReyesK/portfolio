import React from 'react';

import Logout from '../components/logout';
import Login from '../components/login';
import NavBarLink from '../components/navBarLink';

import '../styles/navigation.css';

class NavigationBar extends React.Component {
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

  render(){

    let user = this.state.user;
    var sessionButton = null;
    var loggedInOnlyLinks = null;
    if (user) {
      loggedInOnlyLinks = <>
          <NavBarLink to='/profile'>profile</NavBarLink>
        </>;
      sessionButton = <Logout user={user} callback={() => this.props.logoutCallback()} />;
    } else {
      sessionButton = <Login callback={(data) => this.props.loginCallback(data)} />;
    }

    let navBar =
      <div className='app-nav-bar'>
        <NavBarLink to='/'>home</NavBarLink>
        {loggedInOnlyLinks}
        {sessionButton}
      </div>

    return navBar;
  }
}


export default NavigationBar;
