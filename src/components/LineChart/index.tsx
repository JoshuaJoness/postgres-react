import React from 'react';
import { Line } from 'react-chartjs-2';

const options = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

const LineChart = ({ data }) => <Line data={data} options={options} />

export default LineChart;