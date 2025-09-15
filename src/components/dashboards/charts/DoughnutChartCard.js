import React from 'react';
import c from 'resources/css/dashboards/charts/Charts.module.css';
import cx from 'classnames';
import { bright, getColors } from 'components/dashboards/util/Util'

import {
  Chart as ChartJS, 
  BarElement, 
  CategoryScale, 
  LinearScale, 
  Tooltip, 
  Title,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
 matthew-branch
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title);

function DoughnutChartCard (props)
{
    const { labels = [], data = [] } = props

    const dataset = {
      labels,
      datasets: [{
        data,
        backgroundColor: getColors(labels.length),
        hoverBackgroundColor: getColors(labels.length).map(c => bright(c, 0.85)),
        hoverBorderColor: getColors(labels.length).map(c => bright(c, 0.85)),
        hoverBorderWidth: 3,
      },]
    };

    return (
      <div className={c.module}>

        <div className={cx(c.ChartCard, c.DoughnutChartCard)}>
          <h3 className={c.title}>{this.props.title}</h3>
          <div className={c.ChartCardGraphic}>
            <Doughnut
              data={dataset}
              options={{
                maintainAspectRatio: false,
                responsive: true
              }}
              legend={{
                display: true,
                position: "left",
                labels: {
                  usePointStyle: true,
                }
              }}
            />
          </div>

        </div>
      </div>

    )


export default DoughnutChartCard;