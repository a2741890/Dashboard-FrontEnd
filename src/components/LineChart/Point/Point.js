import React from 'react';
import './Point.css';

const point = (props) => {
  const {cx, cy} = props;
  const xPosition = cx + "px";
  const yPosition = cy + "px";

  const pointStyle = {
    "--x":xPosition,
    "--y":yPosition
  };

  return(
    <div 
    className="data-point"
    style={pointStyle}></div>
  )
}



export default point;