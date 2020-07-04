import React from 'react';
import './AxisLabel.css';

const axisLabel = (props) => {
  const { totalLength, range, xAxis } = props;
  const spacing = totalLength / range.length;

  let axisLabels = [];
  let axisLabel = {};

  const [dynamicAxis, fixedAxis] = xAxis ? ['--x', '--y'] : ['--y', '--x'];
  axisLabels = range
    .map((_, index) => spacing * index)
    .map(pos => {

      //Not sure why need to initialize for correct output (or all will be 200px)
      axisLabel = {
        "--x": "0px",
        "--y": "0px"
      };

      axisLabel[dynamicAxis] = pos + 'px';
      axisLabel[fixedAxis] = '-25px';

      return (
        <p key={pos} className="axisLabel" style={axisLabel}>{pos}</p>
      )
    })

  return (
    <div className="axisLabels">{axisLabels}</div>
  );
}

export default axisLabel;