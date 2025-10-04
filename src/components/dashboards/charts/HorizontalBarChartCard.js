import React from 'react';
import c from 'resources/css/dashboards/charts/Charts.module.css';
import cx from 'classnames';
import { bright } from 'components/dashboards/util/Util'

import { Chart as ChartJS, 
  BarElement, 
  CategoryScale, 
  LinearScale, 
  Tooltip, 
  Title,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title, Legend);

<<<<<<< HEAD
function HorizontalBarChartCard (props) 
{
  const { labels = [], data = [], percentage = true, color = '#5B558B' } = props;
=======
function HorizontalBarChartCard (props)
{
    const { labels = [], data = [], percentage = true, color = '#5B558B' } = props;

>>>>>>> ab0a852e4081788b235cc42716f7ce7b642b3889

  const dataset = {
    labels,
    datasets: [{
      label: "Startup Sector",
      backgroundColor: color,
      borderWidth: 0,
      hoverBackgroundColor: bright(color, 1.1),
      data
    }]
  };

<<<<<<< HEAD
  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {   // ✅ keep only one scales
=======
    const options = {
  indexAxis: 'y',
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      ticks: {
        callback: (value) => `${value}%`, 
      },
      grid: {
        display: false,

      },
    },
    scales: {
>>>>>>> ab0a852e4081788b235cc42716f7ce7b642b3889
      x: {
        beginAtZero: true,
        ticks: {
          callback: (value) => (percentage ? `${value}%` : value),
        },
        grid: { display: false },
      },
      y: {
        grid: { display: false },
      },
<<<<<<< HEAD
    }, 
  }; 
=======
    },
  };
>>>>>>> ab0a852e4081788b235cc42716f7ce7b642b3889

  return (
    <div className={c.module}>
      <div className={cx(c.ChartCard, c.BarChartCard, c.LargeChardCard)}>
<<<<<<< HEAD
        <h3 className={c.title}>{props.title}</h3>
=======
        <h3 className={c.title}>{title}</h3>
>>>>>>> ab0a852e4081788b235cc42716f7ce7b642b3889
        <div className={c.ChartCardGraphic}>
          <Bar data={dataset} options={options} />
        </div>
      </div>
<<<<<<< HEAD
    </div> 
  ); 
}
=======
    )

>>>>>>> ab0a852e4081788b235cc42716f7ce7b642b3889

export default HorizontalBarChartCard;