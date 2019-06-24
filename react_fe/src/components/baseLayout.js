import React from 'react';
import { Route, Link } from 'react-router-dom';

import ErrorBanner from '../components/errorBanner.js';
import UserInfo from '../components/userInfo.js';
import Login from '../components/login.js';


class BaseLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.error !== prevProps.error) {
      this.setState({error: this.props.error});
    }
  }

  render () {
    return (
      <div>
        <header>
            <ErrorBanner errorMessage={this.state.error} />
        </header>

        <div className='app-container'>
          <Route path='/' exact component={UserInfo} />
          <Route path='/login' component={Login} />
        </div>
      </div>
    );
  }
}

export default BaseLayout
