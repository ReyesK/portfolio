import React from 'react'

class ContentLink extends React.Component {

  render(){
    const {text, target, ...rest} = this.props;
    if (typeof target !== 'undefined') {
      rest.target = target;
      rest.rel = 'noopener noreferrer';
    }
    return(
      <a className='font-bold hover:underline active:line-through text-blue-400' {...rest}>{text}</a>
    )
  }
}


export default ContentLink;
