import React from 'react';

import ContentLink from '../../components/contentLink';
import Sidebar from '../../components/sidebar';
import GithubButton from '../../components/githubButton';

class ReactFrontend extends React.Component {

  render() {
    let view =
      <>
      <Sidebar />
      <div className='view-w-sidebar'>
        <div>
          <h4>This site is built with a <ContentLink href='https://reactjs.org/' target='_blank' text='React' /> frontend!</h4>
          <p>Running React version: {React.version}</p>
          <p>Styled using <ContentLink href='https://tailwindcss.com/' target='_blank' text='tailwindcss'/> Framework</p>
          <GithubButton repo='https://github.com/ReyesK/portfolio/tree/master/react_fe'/>
        </div>
      </div>
      </>
    return view;
  }

}

export default ReactFrontend;
