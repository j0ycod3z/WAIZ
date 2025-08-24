import React from 'react';
import redux from 'seed/redux';
import c from 'resources/css/dashboards/pages/Pages.module.css';
import "react-bootstrap";
import cx from 'classnames';

import { lcs, lc } from 'components/util/Locales'
import { format } from 'components/dashboards/util/Util'
import { NavLink, withRouter, Switch, Route, Redirect } from 'react-router-dom';

import LineChartCard from '../charts/LineChartCard';
import DoughnutChartCard from '../charts/DoughnutChartCard';
import AnalyticCard from '../charts/AnalyticsCard';
import Details from '../charts/Details';

class Performance extends React.Component
{

  render()
  {
    const { hypothesisCount = {}, interviewsCount } = this.state;

    const { projects = {}, hypothesisWeek = [], interviewsWeek = [] } = this.state;
    let projectData = [];
    for (let project in projects)
      projectData.push(projects[project])

    //Limit and sort
    let hw = [], iw = [];
    for (let h in hypothesisWeek) hw.push({ name: h, ...hypothesisWeek[h] });
    for (let i in interviewsWeek) iw.push({ name: i, ...interviewsWeek[i] });
    hw = hw.sort((h1, h2) => h2["ALL"] - h1["ALL"])
    iw = iw.sort((i1, i2) => i2["ALL"] - i1["ALL"])



    let hypothesisWeekLabels = [];
    let hypothesisWeekData = [];
    let labelsDone = false;
    for (let h of hw) {
      let item = {}
      item.label = format(h.name);
      item.data = [];
      for (let w in h) {
        if (!w.startsWith("WEEK")) continue;
        item.data.push(h[w])
        if (!labelsDone) hypothesisWeekLabels.push(format(w))
      }
      labelsDone = true;
      hypothesisWeekData.push(item)
    }

    let interviewsWeekLabels = [];
    let interviewsWeekData = [];
    let labelsIDone = false;
    for (let i of iw) {
      let item = {}
      item.label = format(i.name);
      item.data = [];
      for (let w in i) {
        if (!w.startsWith("WEEK")) continue;
        item.data.push(i[w])
        if (!labelsIDone) interviewsWeekLabels.push(format(w))
      }
      labelsIDone = true;
      interviewsWeekData.push(item)
    }


    const { url, path } = this.props.match;

    return (
      <div className={c.module}>
        <h2 className={c.pageTitle}>{lcs("overview")}</h2>
        <div className={cx("row", c.chartRow)}>
          <div className="col col-12">
            <LineChartCard title={lcs("hypotheses")} interview={false} hypothesisCount={hypothesisCount} labels={[...hypothesisWeekLabels]} datasets={[...hypothesisWeekData].splice(0,12)} />
          </div>
        </div>

        <div className={cx("row", c.chartRow)}>
          <div className="col col-12">
            <LineChartCard title={lcs("interviews")} interview={true} interviewsCount={interviewsCount} labels={[...interviewsWeekLabels]} datasets={[...interviewsWeekData].splice(0,12)} />
          </div>
        </div>

        <h2 className={c.pageTitle}>{lcs("projects")}  ({projects.length})</h2>
        {projectData
          .sort((p1, p2) => p1.name.localeCompare(p2.name))
          .map(p =>
            <div className={c.chartRow}>
              <Route path={`${path}/:project_id(${p.id})?`} component={(props) => <AnalyticCard data={p} {...props} />} />
              <Route path={`${path}/${p.id}`} component={() =>
                <Details projectData={p} hLabels={hypothesisWeekLabels} hDatasets={hypothesisWeekData}
                  iLabels={interviewsWeekLabels} iDatasets={interviewsWeekData} />} />
            </div>
          )
        }

      </div>
    )
  }

  constructor(props)
  {
    super(props);
    this.state = {
      hypothesisCount: {},
      interviewsCount: {},
      hypothesisWeek: [],
      interviewsWeek: [],
      projects: {}
    }
  }

  componentDidMount()
  {
    const userId = sessionStorage.getItem('id');
    const cohortId = localStorage.getItem('cohortId');

    const callbackHc = res => this.setState(s => ({ hypothesisCount: res.body }))
    this.props.getStats("/performance/get_hypothesis_counts", { user_id: userId, cohort_id: cohortId }, callbackHc)

    const callbackIc = res => this.setState(s => ({ interviewsCount: res.body }))
    this.props.getStats("/performance/get_interviews_counts", { user_id: userId, cohort_id: cohortId }, callbackIc)

    const callbackHw = res => this.setState(s => ({ hypothesisWeek: res.body }))
    this.props.getStats("/performance/get_hypothesis_per_week", { user_id: userId, cohort_id: cohortId }, callbackHw)

    const callbackIw = res => this.setState(s => ({ interviewsWeek: res.body }))
    this.props.getStats("/performance/get_interviews_per_week", { user_id: userId, cohort_id: cohortId }, callbackIw)

    const callbackPr = res => this.setState(s => ({ projects: res.body }))
    this.props.getStats("/performance/get_projects", { user_id: userId, cohort_id: cohortId }, callbackPr)
  }
}

export default redux(Performance);