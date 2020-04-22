import React from 'react';
import {Link} from 'react-router-dom';

import Logout from '../components/logout';


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
      return(
        <div className='app-nav-bar'>
          <span><Link to='/'>home</Link></span>
          <span><Link to='/profile'>profile</Link></span>
          <Logout user={this.state.user} callback={() => this.props.logoutCallback()} />
        </div>
      )
    } else {
      return null;
    }
  }
}


export default NavigationBar;
