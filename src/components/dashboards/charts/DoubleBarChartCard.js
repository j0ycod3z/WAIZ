import React from 'react';
import c from 'resources/css/dashboards/charts/Charts.module.css';
import cx from 'classnames';

import {
  Chart as ChartJS, 
  BarElement, 
  CategoryScale, 
  LinearScale, 
  Tooltip, 
  Title,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title, Legend);

function DoubleBarChartCard(props) 
{
  const { labels = [], data = [], label = "", percentage = true, title = "" } = props;

  const dataset = {
    labels,
    datasets: [
      {
        label,
        backgroundColor: '#A3A1FB',
        borderWidth: 0,
        hoverBackgroundColor: '#8482DE',
        hoverBorderWidth: 0,
        data
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        grid: { color: "rgba(0, 0, 0, 0)" },
        ticks: {
          beginAtZero: true,
          callback: (value) => value + (percentage ? "%" : "")
        }
      }
    }
  };

  return (
    <div className={c.module}>
      <div className={cx(c.ChartCard, c.BarChartCard)}>
        <h3 className={c.title}>{title}</h3>
        <div className={c.ChartCardGraphic}>
          <Bar data={dataset} height={220} options={options} />
        </div>
      </div>
    </div>
  );
}

export default DoubleBarChartCard;