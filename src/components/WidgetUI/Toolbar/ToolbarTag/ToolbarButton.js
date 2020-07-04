import React from 'react';
import './ToolbarButton.css';

const toolbarButton = (props) => {
  let tagStyle = ['toolbarButton'];
  if(props.selected){
    tagStyle.push('selected');
  }
  return <button
    className={tagStyle.join(' ')}
    onClick={(event) => props.click(event)}>
    {props.children}</button>
}

export default toolbarButton;