import React from 'react';
import c from 'resources/css/dashboards/charts/Charts.module.css';
import cx from 'classnames';
import { bright, getColors } from 'components/dashboards/util/Util'

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
import { Doughnut } from 'react-chartjs-2';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Title, Legend, PointElement, LineElement);

function DoughnutChartCard(props) {
  const { labels = [], data = [], title } = props;
  
  const baseColors = getColors(labels.length);

  const dataset = {
    labels: labels,
    datasets: [{
      data: data,
      backgroundColor: baseColors,
      hoverBackgroundColor: baseColors.map(c => bright(c, 0.85)),
      hoverBorderColor: baseColors.map(c => bright(c, 0.85)),
      hoverBorderWidth: 3,
    }]
  };
  
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "left",
        labels: {
          usePointStyle: true,
        }
      }
    }
  };
  
  return (
    <div className={c.module}>
      <div className={cx(c.ChartCard, c.DoughnutChartCard)}>
        <h3 className={c.title}>{title}</h3>
        <div className={c.ChartCardGraphic}>
          <Doughnut data={dataset} options={options}/>
        </div>
      </div>
    </div>
  );
}

export default DoughnutChartCard;