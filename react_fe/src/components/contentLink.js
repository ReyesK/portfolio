import React from 'react'

class ContentLink extends React.Component {

  render(){
    const {text, ...rest} = this.props;
    return(
      <a className='font-bold hover:underline active:line-through text-blue-400' rel='noopener noreferrer' {...rest}>{text}</a>
    )
  }
}


export default ContentLink;
