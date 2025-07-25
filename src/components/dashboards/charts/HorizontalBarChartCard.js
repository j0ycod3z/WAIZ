import React from 'react';
import c from 'resources/css/dashboards/charts/Charts.module.css';
import "react-bootstrap";
import cx from 'classnames';
import { getColor, bright } from 'components/dashboards/util/Util'

import { HorizontalBar } from 'react-chartjs-2';

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


    return (
      <div className={c.module}>

        <div className={cx(c.ChartCard, c.BarChartCard, c.LargeChardCard)}>
          <h3 className={c.title}>{this.props.title}</h3>
          <div className={c.ChartCardGraphic}>
            <HorizontalBar
              data={dataset}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                tooltips: {
                  enabled: false,
                },
                scales: {
                  yAxes: [{
                    gridLines: {
                      color: "rgba(0, 0, 0, 0)",
                    },
                    ticks: {
                      beginAtZero: true
                    }
                  }],
                  xAxes: [{
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
}

export default HorizontalBarChartCard;