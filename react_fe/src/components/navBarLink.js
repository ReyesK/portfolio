import React from 'react'

import {NavLink} from 'react-router-dom';

class NavBarLink extends React.Component {

  render(){
    let classes = typeof this.props.className === 'undefined' ? 'nav-link' : `nav-link ${this.props.className}`;
    return(
      <span>
        <NavLink className={classes} activeClassName='nav-current' {...this.props} />
      </span>
    )
  }
}


export default NavBarLink;
