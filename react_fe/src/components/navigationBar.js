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
    let sessionButton = null;
    let loggedInOnlyLinks = null;
    if (user) {
      loggedInOnlyLinks = <>
          <NavBarLink to='/profile'>profile</NavBarLink>
        </>;
      sessionButton = <Logout user={user} callback={() => this.props.logoutCallback()} />;
    } else {
      sessionButton = <Login callback={(data) => this.props.loginCallback(data)} />;
    }

    const linksJSX = [
      {to: '/', text: 'home'},
      {to: '/pocs', text: 'POCs'}
    ].map((link) =>
      <NavBarLink key={link.to} to={link.to}>{link.text}</NavBarLink>
    );

    let navBar =
      <div className='app-nav-bar'>
        {linksJSX}
        {loggedInOnlyLinks}
        {sessionButton}
      </div>

    return navBar;
  }
}


export default NavigationBar;
