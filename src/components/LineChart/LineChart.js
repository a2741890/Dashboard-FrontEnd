import React from 'react';
import Point from './Point/Point';
import Line from './Line/Line';
import AxisLabel from './AxisLabel/AxisLabel';
import './LineChart.css';

const lineChart = (props) => {

  const {dataArr, interval, widgetSize, xRange} = props;

  const yMax = Math.max(...dataArr);
  const yMin = Math.min(...dataArr);
  const yRange = yMax - yMin;

  const updatedDataArr = dataArr.map(ele => {
    return (ele - yMin) / yRange;
  })

  const dataPoints = updatedDataArr.map((val, index) => {
    const nextCy = (index === (updatedDataArr.length - 1)) ? val : updatedDataArr[index + 1];
    return (
      <li >
        <Point cx={interval * index} cy={(val) * widgetSize} />
        <Line
          cx={interval * index}
          cy={(val) * widgetSize}
          nextCy={(nextCy) * widgetSize}
          interval={interval} />
      </li>
    )
  });

  return (
    <div className="css-chart" style={{ "--widget-size": `${widgetSize}px` }}>
      <ul className="line-chart">
        {dataPoints}
      </ul>
      <AxisLabel totalLength={widgetSize} range={xRange} xAxis />
      <AxisLabel totalLength={widgetSize} range={dataArr} xAxis={false} />
    </div>
  )
}

export default lineChart;