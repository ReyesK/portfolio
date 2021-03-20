import React from 'react';
import {withRouter} from 'react-router-dom';

import CommentService from '../services/commentService';

class CommentForm extends React.Component {

  // TODO: disable clear button when comment is empty, disable submit if empty
  // enter to submit
  // pagination on comment view. (get comment service needs to be created)

  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
  }

  commentChange = (e) => {
    this.setState({message: e.target.value});
  }

  createComment = (e) => {
    CommentService.create(this.state.message, this.props.location.pathname)
      .then((comment) => {
        // success message banner
        // replace form with a thankyou, or update the comments view...or both
        console.log('created!');
        console.log(comment);
      }).catch((err) => {
        // error message banner
        console.log('error');
        console.log(err);
      });
    e.preventDefault();
  }

  clearComment = (e) => {
    this.setState({message: ''});
    e.preventDefault();
  }

  render() {

    return(
        <form onSubmit={this.createComment}>
          <div className='mt-8'>
            <p>Leave a comment!</p>
            <textarea value={this.state.message} onChange={this.commentChange} className='rounded-sm w-1/3 h-32 bg-gray-3 p-3' />
          </div>
          <button onClick={this.clearComment} className='btn text-white bg-red-700'>Clear</button>
          <input type='submit' value="Comment" className='btn text-white bg-green-700 ml-3' />
        </form>
    );
  }

}

export default withRouter(CommentForm);
