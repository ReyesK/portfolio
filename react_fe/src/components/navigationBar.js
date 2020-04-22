import React from 'react';
import {NavLink} from 'react-router-dom';

import Logout from '../components/logout';

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
    if (this.state.user){
      // TODO make a custom component for NavLink that applies the repeated classes.
      return(
        <div className='app-nav-bar'>
          <span><NavLink exact className='nav-link' activeClassName='nav-current' to='/'>home</NavLink></span>
          <span><NavLink className='nav-link' activeClassName='nav-current' to='/profile'>profile</NavLink></span>
          <Logout user={this.state.user} callback={() => this.props.logoutCallback()} />
        </div>
      )
    } else {
      return null;
    }
  }
}


export default NavigationBar;
