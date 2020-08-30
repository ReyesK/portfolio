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
      if(this.props.errorMessage) {
        setTimeout(() => this.props.clearError(), 5000); // make error banner disappear after some time
      }
    }
  }

  render(){
    if (typeof this.state.errorMessage === 'string' && this.state.errorMessage.trim() !== ''){
      return(
        <div className='h-16 py-4 bg-opacity-80 bg-red text-xl font-semibold text-center fixed w-full z-10'>
            {this.state.errorMessage}
        </div>
      )
    } else {
      return null;
    }
  }
}


export default ErrorBanner;
