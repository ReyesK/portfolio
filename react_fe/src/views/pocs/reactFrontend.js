import React from 'react';

import Sidebar from '../../components/sidebar';

class ReactFrontend extends React.Component {

  render() {
    let view =
      <>
      <Sidebar />
      <div className='view-w-sidebar'>
        <div>
          <h4>This site is built with a React frontend!</h4>
          <p>Running React version: {React.version}</p>
        </div>
      </div>
      </>
    return view;
  }

}

export default ReactFrontend;
