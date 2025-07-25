import React from 'react';
import c from 'resources/css/dashboards/charts/Charts.module.css';
import "react-bootstrap";
import cx from 'classnames';
import { bright } from 'components/dashboards/util/Util'

import { Bar } from 'react-chartjs-2';

class BarChartCard extends React.Component
{
  render()
  {
    const { labels = [], data = [], color = '#5B558B', label = '', showNames = false } = this.props;
    const dataset = {
      labels: labels,
      datasets: [
        {
          label: label,
          backgroundColor: color,
          borderWidth: 0,
          hoverBackgroundColor: bright(color, 0.8),
          hoverBorderColor: bright(color, 0.7),
          hoverBorderWidth: 3,
          data: data
        }
      ]
    };

    return (
      <div className={c.module}>

        <div className={cx(c.ChartCard, c.BarChartCard, c.LargeChardCard)}>
          <h3 className={c.title}>{this.props.title}</h3>
          <div className={c.ChartCardGraphic}>
            <Bar
              data={dataset}
              height={220}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                  yAxes: [{
                    ticks: {
                      beginAtZero: true
                    },
                  }],
                  xAxes: [{
                    ticks: {
                      display: showNames
                    }
                  }]
                }
              }}
              legend={{
                display: true,
                position: "bottom",
                fullWidth: true,
                reverse: false,
                labels: {
                  usePointStyle: false,
                }
              }}
            />
          </div>
        </div>

      </div>
    )
  }
}

export default BarChartCard;