import React from 'react';
import c from 'resources/css/dashboards/charts/Charts.module.css';
import cx from 'classnames';
import { bright } from 'components/dashboards/util/Util'

import {
  Chart, 
  BarElement, 
  CategoryScale, 
  LinearScale, 
  Tooltip, 
  Title,
  Legend,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Title, Legend, PointElement, LineElement);

function HorizontalBarChartCard(props) {
  const { labels = [], data = [], percentage = true, color = '#5B558B', title } = props;

  const dataset = {
    labels,
    datasets: [{
      label: "Startup Sector",
      backgroundColor: color,
      borderWidth: 0,
      hoverBackgroundColor: bright(color, 1.1),
      data
    }]
  };

  const options = {
    indexAxis: 'y', // horizontal bars
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: (value) => (percentage ? `${value}%` : value),
        },
        grid: { display: false },
      },
      y: {
        grid: { display: false },
      },
    },
  };

  return (
    <div className={c.module}>
      <div className={cx(c.ChartCard, c.BarChartCard, c.LargeChardCard)}>
        <h3 className={c.title}>{title}</h3>
        <div className={c.ChartCardGraphic}>
          <Bar data={dataset} options={options} />
        </div>
      </div>
    </div>
  );
}

export default HorizontalBarChartCard;