import React from 'react';
import NavBarLink from '../components/navBarLink';

class Sidebar extends React.Component {

  render(){

    const linksJSX = [ // set navbar links here.
      {to: '/pocs/api', text: 'API'},
      {to: '/pocs/react_frontend', text: 'React Frontend'},
      {to: '/pocs/node_backend', text: 'NodeJS Backend'},
    ].map((link) =>
      <NavBarLink className='block px-3 py-2' key={link.to} to={link.to}>{link.text}</NavBarLink>
    );

    let sidebar =
      <div className='bg-gray-3 fixed mt-16 h-full w-1/6 overflow-scroll'>
          {linksJSX}
      </div>

    return sidebar;
  }

}


export default Sidebar;
