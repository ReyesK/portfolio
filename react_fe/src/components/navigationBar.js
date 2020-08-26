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
      sessionButton = <Logout user={user} callback={() => this.props.logoutCallback()} />;
    } else {
      sessionButton = <Login callback={(data) => this.props.loginCallback(data)} />;
    }

    const linksJSX = [ // set navbar links here. object format {to: required(string), text: required(string), exact: optional(bool), userRequired: optional(bool)}
      {to: '/', text: 'home', exact: true},
      {to: '/pocs', text: 'POCs'},
      {to: '/profile', text: 'profile', exact: true, userRequired: true}
    ]
    .filter((link) => !link.userRequired || (link.userRequired && user)) // remove userRequired links if there is no user.
    .map((link) =>
      <NavBarLink exact={link.exact} key={link.to} to={link.to}>{link.text}</NavBarLink>
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
