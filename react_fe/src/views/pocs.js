import React from 'react';

import Sidebar from '../components/sidebar';

import '../styles/navigation.css';

class POCs extends React.Component {

  render() {
    let view =
      <div className='content-container'>
        <Sidebar />
        <div>
          <h4>Use the sidebar to explore my Proof of Concepts!</h4>
        </div>
      </div>

    return view;
  }

}

export default POCs;
