import React from 'react';

import Sidebar from '../../components/sidebar';

class APIPOC extends React.Component {

  render() {
    let view =
      <div className='content-container'>
        <Sidebar />
        <div>
          <h4>Watch me consume an API!</h4>
        </div>
      </div>

    return view;
  }

}

export default APIPOC;
