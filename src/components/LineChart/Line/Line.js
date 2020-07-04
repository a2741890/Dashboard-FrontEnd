import React from 'react';
import './Line.css';

const line = (props) => {

  const {cx, cy, nextCy, interval} = props;
  const height = nextCy - cy;
  const arcTan = Math.atan(height/interval);
  const hypotenuse = height === 0 ? interval : height * (1/Math.sin(arcTan));
  const lineStyle = {
    "--hypotenuse": hypotenuse,
    "--x": cx + "px",
    "--y": cy + "px",
    "--angle": arcTan
  };

  return (
    <div
      className="line-segment"
      style={lineStyle}></div>
  )
}

export default line;