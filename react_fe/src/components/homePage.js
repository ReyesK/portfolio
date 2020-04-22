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
    if (this.state.user) {
      const user = this.state.user;
      return (
        <div className='user-container'>
          <div className='user-heading'>
            <img src={user.picture} alt='user' className='user-image' />
            <h2>Hello, {user.givenName}</h2>
          </div>
          <div>
            <h5>Welcome to my react frontend, node express backend project!</h5>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default HomePage;
