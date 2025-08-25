import React from 'react';
import redux from 'seed/redux';
import c from 'resources/css/dashboards/pages/Pages.module.css';
import "resources/bootstrap.min.module.css";
import cx from 'classnames';
import { lcs, lc } from 'components/util/Locales'
import { format } from 'components/dashboards/util/Util'

import LargeDoughnutChartCard from 'components/dashboards/charts/LargeDoughnutChartCard';
import BarChartCard from 'components/dashboards/charts/BarChartCard';
import DoubleBarChartCard from 'components/dashboards/charts/DoubleBarChartCard';
import BolaCard from 'components/dashboards/charts/BolaCard';


function Benchmark (props)
{
  const barchart1 = {
    labels: ['Startup', 'Grow up', 'Scale Up', 'Industry Master​'],
    datasets: [
      {
        label: "Industry average (USD K)",
        backgroundColor: 'rgba(91,85,139,1)',
        borderWidth: 0,
        hoverBackgroundColor: 'rgba(91,85,139,1)',
        hoverBorderColor: '#8079BC',
        hoverBorderWidth: 3,
        data: [25, 55, 18, 37]
      },
      {
        label: "Project Average (USD K)",
        backgroundColor: '#928DAF',
        borderWidth: 0,
        hoverBackgroundColor: '#928DAF',
        hoverBorderColor: '#CBC8E0',
        hoverBorderWidth: 3,
        data: [20, 43, 25, 43]
      }
    ]
  };

  const barchart2 = {
    labels: ['Startup', 'Grow up', 'Scale Up', 'Industry Master​'],
    datasets: [
      {
        label: "Industry average (USD K)",
        backgroundColor: 'rgba(91,85,139,1)',
        borderWidth: 0,
        hoverBackgroundColor: 'rgba(91,85,139,1)',
        hoverBorderColor: '#8079BC',
        hoverBorderWidth: 3,
        data: [50, 10, 38, 50]
      },
      {
        label: "Project Average (USD K)",
        backgroundColor: '#928DAF',
        borderWidth: 0,
        hoverBackgroundColor: '#928DAF',
        hoverBorderColor: '#CBC8E0',
        hoverBorderWidth: 3,
        data: [10, 45, 12, 30]
      }
    ]
  };

  const dona1 = {
    labels: ['México', 'Brazil', 'Colombia'],
    datasets: [{
      data: [63, 42, 5],
      backgroundColor: ['#11C26F', '#198CE5', '#F96276'],
      hoverBackgroundColor: ['#11C26F', '#198CE5', '#F96276'],
      hoverBorderWidth: 3,
      hoverBorderColor: ['#33EA94', '#19BBE5', '#F897A4']
    }]
  };

  const dona2 = {
    labels: ['Tesla', 'SpaceX', 'Huawei', 'Blue origin'],
    datasets: [{
      data: [2, 4, 6, 2],
      backgroundColor: ['#11C26F', '#198CE5', '#5B558B', '#F96276'],
      hoverBackgroundColor: ['#11C26F', '#198CE5', '#5B558B', '#F96276'],
      hoverBorderWidth: 3,
      hoverBorderColor: ['#33EA94', '#19BBE5', '#8079BC', '#F897A4']
    }]
  };

  const dona3 = {
    labels: ['Startup', 'Grow up', 'Scale Up'],
    datasets: [{
      data: [2, 1, 1],
      backgroundColor: ['#11C26F', '#198CE5', '#F96276'],
      hoverBackgroundColor: ['#11C26F', '#198CE5', '#F96276'],
      hoverBorderWidth: 3,
      hoverBorderColor: ['#33EA94', '#19BBE5', '#F897A4']
    }]
  };

  return (
    <div className={c.module}>
      <h2 className={c.pageTitle}>PROJECT</h2>
      <div className={cx("row", c.chartRow)}>
        <div className="col col-12 col-lg-4">
          <BarChartCard title="Profit margin" data={barchart1} />
        </div>
        <div className="col col-12 col-lg-4">
          <BarChartCard title="Sales" data={barchart2} />
        </div>
        <div className="col col-12 col-lg-4">
          <LargeDoughnutChartCard title="Location" data={dona1} />
        </div>
      </div>

      <div className={cx("row", c.chartRow)}>
        <div className="col col-12 col-lg-6">
          <DoubleBarChartCard title="Startup Funding" />
        </div>
        <div className="col col-12 col-lg-6">
          <BarChartCard title="CAC" data={barchart1} />
        </div>
      </div>
    </div>
  );
}

export default redux(Benchmark);