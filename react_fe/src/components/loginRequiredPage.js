import React from 'react';

class LoginRequiredPage extends React.Component {

  render() {
    let view =
      <div className='content-container'>
        <div>
          <h4>Login with Google to view this page.</h4>
        </div>
      </div>

    return view;
  }

}

export default LoginRequiredPage;
