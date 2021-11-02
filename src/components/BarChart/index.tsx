import React from 'react';
import { Bar } from 'react-chartjs-2';

const options = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

const BarChart = ({ data }:{ data: any }) => <Bar data={data} options={options} />;

export default BarChart;