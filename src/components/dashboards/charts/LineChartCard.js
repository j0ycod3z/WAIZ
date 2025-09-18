import React from 'react';
import c from 'resources/css/dashboards/charts/Charts.module.css';
import cx from 'classnames';
import { lcs } from 'components/util/Locales'
import { getColor, bright } from 'components/dashboards/util/Util'

import { Chart as ChartJS, 
  BarElement, 
  CategoryScale, 
  LinearScale, 
  Tooltip, 
  Title,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title, Legend);


function LineChartCard (props)
{
    const { hypothesisCount = {}, interviewsCount = {}, labels = [], datasets = [], title, interview = false } = props;
    const data = {
      labels,
      datasets: datasets.map((d, idx) => ({
        label: d.label,
        fill: false,
        borderColor: getColor(idx),
        pointBorderColor: getColor(idx),
        pointBackgroundColor: "#fff",
        borderCapStyle: 'butt',
        steppedLine: false,
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: getColor(idx),
        pointHoverBorderColor: bright(getColor(idx), 1.1),
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        data: d.data
      }))
    };
  
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        fullWidth: true,
        reverse: false
      }
    }
  };
  
  return (
    <div className={c.module}>
      <div className={c.ChartCard} style={{ height: "1650px" }}>
        <div className={c.ChartCardInfo}>
          <h3 className={c.title}>{title}</h3>
          {interview ? (
            <div>
              <div className={cx(c.data)}>
                <p><b>{lcs("total")}:</b></p>
                <p className={cx(c.dataNumber)}><b>{interviewsCount.total}</b></p>
              </div>
              <div className={c.data}>
                <p>{lcs("this_week")}:</p>
                <p className={cx(c.dataNumber, c.greenFont)}>{interviewsCount.week}</p>
              </div>
              <div className={c.data} style={{ height: "135px" }}>
              </div>
            </div>
          ) : (
            <div>
              <div className={cx(c.data)}>
                <p><b>{lcs("total")}:</b></p>
                <p className={cx(c.dataNumber)}><b>{hypothesisCount.total}</b></p>
              </div>
              <div className={c.data}>
                <p>{lcs("valid")}:</p>
                <p className={cx(c.dataNumber, c.greenFont)}>{hypothesisCount.is_valid}</p>
              </div>
              <div className={c.data}>
                <p>{lcs("invalid")}:</p>
                <p className={cx(c.dataNumber, c.redFont)}>{hypothesisCount.is_invalid}</p>
              </div>
              <div className={c.data} style={{ height: "70px" }}>
              </div>
            </div>
          )}
        </div>
        <div className={c.ChartCardGraphic} style={{ height: "265px" }}>
          <Line data={data} options={options}/>
        </div>
      </div>
    </div>
  );
}
export default LineChartCard;