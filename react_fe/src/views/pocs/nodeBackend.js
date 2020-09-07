import React from 'react';

import ContentLink from '../../components/contentLink';
import Sidebar from '../../components/sidebar';
import GithubButton from '../../components/githubButton';

class NodeBackend extends React.Component {

  render() {
    // TODO insert a button that hits a GET endpoint, maybe return nodejs version?
    // make a form for creating comments.
    // let users delete their own comments?
    // let users update their own comments
    let view =
      <>
      <Sidebar />
      <div className='view-w-sidebar'>
        <div>
          <p className='text-lg font-bold'>This site runs with <ContentLink href='https://nodejs.org/' text='Nodejs' target='_blank' />
            &nbsp;using <ContentLink href='https://expressjs.com/' text='Express' target='_blank' /> as a backend server.
          </p>

          <p>The server uses <ContentLink href='https://sequelize.org/' text='Sequelize ORM' target='_blank' />
            &nbsp;to connect to a <ContentLink href='https://www.postgresql.org/' text='PostgreSQL' target='_blank' /> database.</p>
          <p>Use the controls below to call the backend from this page!</p>
          <p>*Currently only supporting Get and Create example calls.</p>
          <GithubButton repo='https://github.com/ReyesK/portfolio/tree/master/node_backend'/>
        </div>
      </div>
      </>
    return view;
  }

}

export default NodeBackend;
