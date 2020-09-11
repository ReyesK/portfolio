import React from 'react';

import ContentLink from '../../components/contentLink';
import Sidebar from '../../components/sidebar';
import GithubButton from '../../components/githubButton';

class NodeBackend extends React.Component {

  state = {
    versions: null
  }

  getServerVersions = () => {
    const url = process.env.REACT_APP_BACKEND_BASEURL + 'versions';
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({versions: data}));
  }

  versionView(versions) {
    let versionView = [];
    if (versions) {
      for(const k in versions) {
        if(['node', 'v8', 'http_parser'].includes(k)){
          versionView.push(<div key={`${k}-version`}>{k}: {versions[k]}</div>)
        }
      }
    }
    return versionView;
  }

  render() {
    // make a form for creating comments.
    // let users delete their own comments?
    // let users update their own comments

    const versionView = this.versionView(this.state.versions);

    return  <>
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

          <button className='btn mt-4 text-white bg-green-700' onClick={this.getServerVersions}>Get Server Versions</button>

          <div className='mt-3 space-y-3'>
            {versionView}
          </div>
          <GithubButton repo='https://github.com/ReyesK/portfolio/tree/master/node_backend'/>
        </div>
      </div>
      </>
  }

}

export default NodeBackend;
