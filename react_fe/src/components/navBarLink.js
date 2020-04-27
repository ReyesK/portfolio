import React from 'react'

import {NavLink} from 'react-router-dom';

class NavBarLink extends React.Component {
  
  render(){
    return(
      <span>
        <NavLink exact className='nav-link' activeClassName='nav-current' {...this.props} />
      </span>
    )
  }
}


export default NavBarLink;
