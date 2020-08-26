import React from 'react';

import Sidebar from '../../components/sidebar';

class APIPOC extends React.Component {

  render() {
    let view =
      <div className='content-container'>
        <Sidebar />
        <div>
          <h4>This site is built with a React frontend!</h4>
          <p>Running React version: {React.version}</p>
        </div>
      </div>

    return view;
  }

}

export default APIPOC;
