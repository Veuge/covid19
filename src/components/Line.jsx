import React from 'react';
import { Line } from 'react-chartjs-2';
import { chartColors } from "../helpers/chartColorsHelper";
import { getData } from '../helpers/dataHelper';

const LineChart = props => {
  const data = {
    labels: props.labels,
    datasets: props.selectedHistorics.map((sh, i) => ({
      label: sh.name,
      fill: false,
      backgroundColor: chartColors[i].backgroundColor,
      borderColor: chartColors[i].borderColor,
      data: getData(sh.timeline.cases)
    }))
  };

  return (
    <div style={{ paddingBottom: 20 }}>
      <h2 className="Text">{props.country}</h2>
      <Line
        data={data}
        options={{ maintainAspectRatio: false }}
        width={800}
        height={500}
      />
    </div>
  );
}

export default LineChart;