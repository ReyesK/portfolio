import React from 'react';

import ContentLink from '../../components/contentLink';
import Sidebar from '../../components/sidebar';
import GithubButton from '../../components/githubButton';

class NodeBackend extends React.Component {

  render() {
    let view =
      <>
      <Sidebar />
      <div className='view-w-sidebar'>
        <div>
          <h4></h4>
          <GithubButton repo='https://github.com/ReyesK/portfolio/tree/master/node_backend'/>
        </div>
      </div>
      </>
    return view;
  }

}

export default NodeBackend;
