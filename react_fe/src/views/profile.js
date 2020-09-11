import React from 'react';

class Profile extends React.Component {

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
      for(const k in user) {
        if (k !== 'picture') {
          userInfo.push(<p key={'profile-' + k}>{k}: {user[k]}</p>)
        }
      }

      const info = <div className='view-no-sidebar'>
        <div className='mx-auto w-1/2'>
          <div className='flex items-center mb-4'>
            <img src={user.picture} alt='user' className='rounded-full mr-3 w-16 h-16' />
            <h2 className='font-bold'>Hello, {user.givenName}</h2>
          </div>
          <h5 className='font-bold'>We have fetched this data about you</h5>
          <div>
            {userInfo}
          </div>
        </div>
      </div>

      return info;
    } else {
      return null;
    }
  }
}

export default Profile;
