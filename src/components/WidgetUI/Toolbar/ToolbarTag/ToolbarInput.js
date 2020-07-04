import React from 'react';
import './ToolbarInput.css';

const toolbarInput = (props) => {
  return <div className="toolbarInput">
    <input style={{ width: props.width }}
      type={props.type}
      placeholder={props.placeholder}
      name={props.name}
      value={props.value}
      defaultChecked={props.defaultChecked}
      onClick={props.click}
      onChange={props.change ? (event) => props.change(event) : null} />
  </div>
}

export default toolbarInput;