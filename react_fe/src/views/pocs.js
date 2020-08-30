import React from 'react';

import Sidebar from '../components/sidebar';

class POCs extends React.Component {

  render() {
    let view =
      <>
      <Sidebar />
      <div className='view-w-sidebar'>
        <div>
          <h4>Use the sidebar to explore my Proof of Concepts!</h4>
        </div>
      </div>
      </>

    return view;
  }

}

export default POCs;
