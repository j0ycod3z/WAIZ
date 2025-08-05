import React from 'react';
import c from 'resources/css/dashboards/charts/Charts.module.css';
import cx from 'classnames';
import "react-bootstrap";
import { bright, getColors } from 'components/dashboards/util/Util'

import { Doughnut } from 'react-chartjs-2';

class LargeDoughnutChartCard extends React.Component
{
  render()
  {
    const { labels = [], data = [], usePercentage = false } = this.props

    const dataset = {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: getColors(labels.length),
        hoverBackgroundColor: getColors(labels.length).map(c => bright(c, 0.85)),
        hoverBorderColor: getColors(labels.length).map(c => bright(c, 0.85)),
        hoverBorderWidth: 3,
      },]
    };

    return (
      <div className={c.module}>

        <div className={cx(c.ChartCard, c.DoughnutChartCard, c.LargeChardCard)}>
          <h3 className={c.title}>{this.props.title}</h3>
          <div className={c.ChartCardGraphic}>
            <Doughnut
              data={dataset}
              height={250}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: function (tooltipItem) {
                        const dataset = tooltipItem.dataset;
                        const total = dataset.data.reduce((prev, curr) => prev + curr, 0);
                        const currentValue = dataset.data[tooltipItem.dataIndex];
                        if (!usePercentage) return currentValue;
                        const percentage = Math.floor((currentValue / total) * 100 + 0.5);
                        return percentage + "%";
                      }
                    }
                  }
                }
              }}

              legend={{
                display: true,
                position: "bottom",
                labels: {
                  usePointStyle: true,
                }
              }}
            />
          </div>
        </div>

      </div>
    )
  }
}

export default LargeDoughnutChartCard;