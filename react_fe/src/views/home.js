import React from 'react';

import ContentLink from '../components/contentLink';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.setState({user: this.props.user});
    }
  }

  render() {
    let user = this.state.user;

    let view =
      <div className='view-no-sidebar text-center'>
        <div>
          <h4>{this.welcomeHeader(user)}</h4>
          <p>Check out my <ContentLink href='/pocs' text='POCs' /></p>
        </div>
      </div>

    return view;
  }

  // view helpers
  welcomeHeader(user) {
    if(user){
      return `Welcome ${user.givenName}!`;
    } else {
      return 'Welcome!';
    }
  }

}

export default HomePage;
