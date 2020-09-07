import React from 'react';

class GithubButton extends React.Component {
  render(){
    // make button bg change on hover/active
    // add githhub icon
    const {repo} = this.props;
    return(
        <a href={repo}
           className='bg-white w-48 h-10 text-black flex items-center my-3 rounded-sm space-x-3 hover:opacity-80'
           target='_blank' rel='noopener noreferrer'>
          <img src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
                 className='w-10 h-10 ml-1'
                 alt='octocat'/>
          <span className='text-lg'>
            View Source
          </span>
        </a>
    )
  }
}


export default GithubButton;
