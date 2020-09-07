import React from 'react';

import Sidebar from '../components/sidebar';

class POCs extends React.Component {

  render() {
    let view =
      <>
      <Sidebar />
      <div className='view-w-sidebar'>
        <div>
          <p className='text-lg font-bold'>Use the sidebar to explore my Proof of Concepts!</p>
          <p>Each page in the sidebar will include a github link for the project's source code.</p>
        </div>
      </div>
      </>

    return view;
  }

}

export default POCs;
