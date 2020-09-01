import React from 'react'

import {NavLink} from 'react-router-dom';

class NavBarLink extends React.Component {

  render(){
    const {className, ...rest} = this.props

    return(
      <span>
        <NavLink className={this.inheritClasses(className)} activeClassName='underline' {...rest} />
      </span>
    )
  }

  inheritClasses(parentClasses) {
    const defaultClasses = 'font-bold hover:underline active:line-through';
    return typeof parentClasses === 'undefined' ? defaultClasses : `${defaultClasses} ${parentClasses}`;
  }
}


export default NavBarLink;
