import React from 'react';

import Sidebar from '../../components/sidebar';

class APIPOC extends React.Component {

  render() {
    let view =
      <>
      <Sidebar />
      <div className='view-w-sidebar'>
        <div>
          <h4>Watch me consume an API!</h4>
        </div>
      </div>
      </>
    return view;
  }

}

export default APIPOC;
