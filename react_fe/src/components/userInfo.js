import React from 'react';

class UserInfo extends React.Component {

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
      let userInfo = []
      for(let k in user) {
        if (k !== 'picture') {
          userInfo.push(<p key={'user-' + k}>{k}: {user[k]}</p>)
        }
      }

      const info = <div className='user-container'>
        <div className='user-heading'>
          <img src={user.picture} alt='user' className='user-image' />
          <h2>Hello, {user.givenName}</h2>
        </div>
        <h5>We have fetched this data about you</h5>
        <div className='user-info'>
          {userInfo}
        </div>
      </div>

      return info;
    } else {
      return null;
    }
  }
}

export default UserInfo;
