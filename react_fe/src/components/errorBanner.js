import React from 'react';

class ErrorBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: this.props.errorMessage
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.errorMessage !== prevProps.errorMessage) {
      this.setState({errorMessage: this.props.errorMessage})
    }
    setTimeout(() => this.setState({errorMessage: null}), 5000); // make error banner disappear after some time
  }

  render(){
    if (typeof this.state.errorMessage === 'string' && this.state.errorMessage.trim() !== ''){
      return(
        <div className='error-banner'>
            {this.state.errorMessage}
        </div>
      )
    } else {
      return null;
    }
  }
}


export default ErrorBanner;
