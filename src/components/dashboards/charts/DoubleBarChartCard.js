import React from 'react';
import c from 'resources/css/dashboards/charts/Charts.module.css';
import "resources/bootstrap.min.module.css";
import cx from 'classnames';

import { Chart as ChartJS, 
  BarElement, 
  CategoryScale, 
  LinearScale, 
  Tooltip, 
  Title } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title);

function DoubleBarChartCard (props)
{
    const { labels = [], data = [], label = "", percentage=true } = props;

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
    return (
      <div className={c.module}>

        <div className={cx(c.ChartCard, c.BarChartCard)}>
          <h3 className={c.title}>{this.props.title}</h3>
          <div className={c.ChartCardGraphic}>
            <Bar
              data={dataset}
              height={220}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                barRoundness: 4,
                scales: {
                y: {
                  grid: {
                    color: "rgba(0, 0, 0, 0)"
                  },
                  ticks: {
                    beginAtZero: true,
                    callback: function (value) {
                      return value + (percentage ? "%" : "");
                    }
                  }
                }
              },
              }}
              legend={{
                display: false,
              }}
            />
          </div>
        </div>

      </div>
    )
}

export default DoubleBarChartCard;