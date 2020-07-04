import React from 'react';
import './ToolbarTag.css';

const toolbarTag = (props) => {
  let tagStyle = ['toolbarTag'];
  if(props.selected){
    tagStyle.push('selected');
  }
  return <div
    className={tagStyle.join(' ')}
    onClick={props.click}>
    {props.children}</div>
}

export default toolbarTag;