import React from 'react';

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
      <div className='content-container'>
        <div>
          <h4>{this.welcomeHeader(user)}</h4>
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
