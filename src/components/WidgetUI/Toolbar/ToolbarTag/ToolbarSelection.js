import React from 'react';
import './ToolbarSelection.css'

const toolbarSelection = (props) => {

  let tagStyle = ['toolbarSelection'];
  if(props.selected){
    tagStyle.push('selected');
  }

  const options = props.options.map(opt => {
    return <option key={opt} value={opt}>{opt}</option>
  })

  return <div className={tagStyle.join(' ')}>
    <select
      onChange={(event) => props.selectChange(event)}
      onClick={(event) => props.click ? props.click(event) : null}>
      <option defaultValue value={props.children}>{props.children}</option>
      {options}
    </select>
  </div>
}

export default toolbarSelection;