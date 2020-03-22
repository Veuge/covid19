import React from 'react';
import { Line } from 'react-chartjs-2';

const LineExample = props => {
  const data = {
    labels: props.labels,
    options: {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          fontColor: '#121212'
        }
      }
    },
    datasets: [
      {
        label: 'Test',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: props.data
      }
    ]
  };

  return (
    <div>
      <h2 className="Text">Line Example</h2>
      <Line
        data={data}
        options={{
          legend: {
            labels: {
              // This more specific font property overrides the global property
              fontColor: 'black'
            }
          },
          maintainAspectRatio: false
        }}
        width={500}
        height={200}
      />
    </div>
  );
}

export default LineExample;