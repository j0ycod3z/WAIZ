import React from 'react';
import c from 'resources/css/dashboards/charts/Charts.module.css';
import cx from 'classnames';
import { bright } from 'components/dashboards/util/Util'

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

function BarChartCard (props)
{
    const { labels = [], data = [], color = '#5B558B', label = '', showNames = false, title } = props;
    const dataset = {
      labels,
      datasets: [
        {
          label,
          backgroundColor: color,
          borderWidth: 0,
          hoverBackgroundColor: bright(color, 0.8),
          hoverBorderColor: bright(color, 0.7),
          hoverBorderWidth: 3,
          data: data
        }
      ]
    };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        ticks: { beginAtZero: true }
      },
      x: {
        ticks: { display: showNames }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        fullWidth: true,
        reverse: false,
        labels: { usePointStyle: false }
      }
    }
  };
  
  return (
    <div className={c.module}>
      <div className={cx(c.ChartCard, c.BarChartCard, c.LargeChardCard)}>
        <h3 className={c.title}>{title}</h3>
        <div className={c.ChartCardGraphic}>
          <Bar data={dataset} height={220} options={options}/>
        </div>
      </div>
    </div>
    )

}

export default BarChartCard;