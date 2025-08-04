import React from 'react';
import c from 'resources/css/dashboards/charts/Charts.module.css';
import "resources/bootstrap.min.module.css";
import cx from 'classnames';
import { getColor, bright } from 'components/dashboards/util/Util'

import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Title } from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title);

class HorizontalBarChartCard extends React.Component
{
  render()
  {
    const { labels = [], data = [], percentage = true, color = '#5B558B' } = this.props;

    const dataset = {
      labels: labels,
      datasets: [
        {
          label: "Startup Sector",
          backgroundColor: color,
          borderWidth: 0,
          hoverBackgroundColor: bright(color, 1.1),
          data: data
        }
      ]
    };

    const options = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        tooltip: {
        enabled: false
        }
      },
      legend: {
        display: false,
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            callback: (value) => value + (percentage ? "%" : ""),
          },
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            display: false
          }
        }
      }       
    }


    return (
      <div className={c.module}>

        <div className={cx(c.ChartCard, c.BarChartCard, c.LargeChardCard)}>
          <h3 className={c.title}>{this.props.title}</h3>
          <div className={c.ChartCardGraphic}>
            <Chart type="bar" data={dataset} options={options} />
          </div>
        </div>
      </div>
    )
  }
}

export default HorizontalBarChartCard;