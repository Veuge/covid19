import React from 'react';
import { Line } from 'react-chartjs-2';
import { chartColors } from "../helpers/chartColorsHelper";
import { getData } from '../helpers/dataHelper';
import * as SIZE_HELPER from "../helpers/responsiveHelper"

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

  const getChartSize = () => {
    const { w } = props.viewport;
    let size = {};
    if (w <= SIZE_HELPER.EXTRA_SMALL) {
      size = SIZE_HELPER.CHART_SIZES.EXTRA_SMALL
    } else if (w > SIZE_HELPER.EXTRA_SMALL && w <= SIZE_HELPER.SMALL) {
      size = SIZE_HELPER.CHART_SIZES.SMALL;
    } else if (w > SIZE_HELPER.SMALL && w <= SIZE_HELPER.MEDIUM) {
      size = SIZE_HELPER.CHART_SIZES.MEDIUM;
    } else if (w > SIZE_HELPER.MEDIUM) {
      size = SIZE_HELPER.CHART_SIZES.LARGE;
    }
    return size;
  }

  return (
    <div style={{ paddingBottom: 20 }}>
      <h2 className="Text">{props.country}</h2>
      <Line
        data={data}
        options={{ maintainAspectRatio: false }}
        width={getChartSize().width}
        height={getChartSize().height}
      />
    </div>
  );
}

export default LineChart;