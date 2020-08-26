import React from 'react';
import NavBarLink from '../components/navBarLink';

class Sidebar extends React.Component {

  render(){

    const linksJSX = [ // set navbar links here.
      {to: '/pocs/api', text: 'API'},
      {to: '/pocs/react_frontend', text: 'React Frontend'}
    ].map((link) =>
      <NavBarLink className='sidebar-link nav-link' key={link.to} to={link.to}>{link.text}</NavBarLink>
    );

    let sidebar =
      <div className='sidebar-container'>
        <div className='app-sidebar'>
          {linksJSX}
        </div>
      </div>

    return sidebar;
  }

}


export default Sidebar;
