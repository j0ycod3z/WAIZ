import React from 'react';
import c from 'resources/css/dashboards/charts/Charts.module.css';
import "react-bootstrap";
import cx from 'classnames';

import { Bar } from 'react-chartjs-2';

class DoubleBarChartCard extends React.Component
{
  render()
  {
    const { labels = [], data = [], label = "", percentage=true } = this.props;

    const dataset = {
      labels: labels,
      datasets: [
        {
          label: label,
          backgroundColor: '#A3A1FB',
          borderWidth: 0,
          hoverBackgroundColor: '#8482DE',
          hoverBorderWidth: 0,
          data: data
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
                  yAxes: [{
                    gridLines: {
                      color: "rgba(0, 0, 0, 0)",
                    },
                    ticks: {
                      display: true,
                      beginAtZero: true,
                      callback: function (value, index, values)
                      {
                        return value + (percentage ? "%" : "");
                      },
                    }
                  }]
                }
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
}

export default DoubleBarChartCard;