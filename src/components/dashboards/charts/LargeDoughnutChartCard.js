import React from 'react';
import c from 'components/dashboards/charts/Charts.module.scss';
import cx from 'classnames';
import { bright, getColors } from 'components/dashboards/util/Util'

import {
  Chart,
  ArcElement,
  Tooltip,
  Title,
  Legend,
  PointElement,
  LineElement
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Title, Legend, PointElement, LineElement);

function LargeDoughnutChartCard(props) {
  const { labels = [], data = [], usePercentage = false, title } = props;

  const baseColors = getColors(labels.length);

  const dataset = {
    labels,
    datasets: [{
      data,
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
        position: "bottom",
        labels: {
          usePointStyle: true,
        }
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const dataset = tooltipItem.dataset;
            const total = dataset.data.reduce((prev, curr) => prev + curr, 0);
            const currentValue = dataset.data[tooltipItem.dataIndex];
            if (!usePercentage) return currentValue;
            const percentage = Math.round((currentValue / total) * 100);
            return `${percentage}%`;
          }
        }
      }
    }
  };

  return (
    <div className={c.module}>
      <div className={cx(c.ChartCard, c.DoughnutChartCard, c.LargeChardCard)}>
        <h3 className={c.title}>{title}</h3>
        <div className={c.ChartCardGraphic}>
          <Doughnut data={dataset} height={250} options={options}/>
        </div>
      </div>
    </div>
  );
}

export default LargeDoughnutChartCard;