import React from 'react';
import redux from 'seed/redux';
import c from 'resources/css/dashboards/pages/Pages.module.css';
import "resources/bootstrap.min.module.css";
import cx from 'classnames';

import { lcs, lc } from 'components/util/Locales'
import { format } from 'components/dashboards/util/Util'
import { NavLink, withRouter, Switch, Route, Redirect } from 'react-router-dom';

import LineChartCard from '../charts/LineChartCard';
import AnalyticCard from '../charts/AnalyticsCard';
import Details from '../charts/Details';

function Performance (props)
{

  const { getStats, match } = props;


  const [hypothesisCount, setHypothesisCount] = useState({});
  const [interviewsCount, setInterviewsCount] = useState({});
  const [hypothesisWeek, setHypothesisWeek] = useState([]);
  const [interviewsWeek, setInterviewsWeek] = useState([]);
  const [projects, setProjects] = useState({});


  useEffect(() => {
    const userId = sessionStorage.getItem('id');
    const cohortId = localStorage.getItem('cohortId');

    getStats("/performance/get_hypothesis_counts", { user_id: userId, cohort_id: cohortId }, res => setHypothesisCount(res.body));
    getStats("/performance/get_interviews_counts", { user_id: userId, cohort_id: cohortId }, res => setInterviewsCount(res.body));
    getStats("/performance/get_hypothesis_per_week", { user_id: userId, cohort_id: cohortId }, res => setHypothesisWeek(res.body));
    getStats("/performance/get_interviews_per_week", { user_id: userId, cohort_id: cohortId }, res => setInterviewsWeek(res.body));
    getStats("/performance/get_projects", { user_id: userId, cohort_id: cohortId }, res => setProjects(res.body));
  }, [getStats]);

  let projectData = [];
  for (let project in projects) projectData.push(projects[project]);

  let hw = [];
  for (let h in hypothesisWeek) hw.push({ name: h, ...hypothesisWeek[h] });
  hw = hw.sort((h1, h2) => h2["ALL"] - h1["ALL"]);

  let hypothesisWeekLabels = [];
  let hypothesisWeekData = [];
  let labelsDone = false;
  for (let h of hw) {
    let item = { label: format(h.name), data: [] };
    for (let w in h) {
      if (!w.startsWith("WEEK")) continue;
      item.data.push(h[w]);
      if (!labelsDone) hypothesisWeekLabels.push(format(w));
    }
    labelsDone = true;
    hypothesisWeekData.push(item);
  }

  // interviews week
  let iw = [];
  for (let i in interviewsWeek) iw.push({ name: i, ...interviewsWeek[i] });
  iw = iw.sort((i1, i2) => i2["ALL"] - i1["ALL"]);

  let interviewsWeekLabels = [];
  let interviewsWeekData = [];
  let labelsIDone = false;
  for (let i of iw) {
    let item = { label: format(i.name), data: [] };
    for (let w in i) {
      if (!w.startsWith("WEEK")) continue;
      item.data.push(i[w]);
      if (!labelsIDone) interviewsWeekLabels.push(format(w));
    }
    labelsIDone = true;
    interviewsWeekData.push(item);
  }

  const { path } = match;

  return (
    <div className={c.module}>
      <h2 className={c.pageTitle}>{lcs("overview")}</h2>
      <div className={cx("row", c.chartRow)}>
        <div className="col col-12">
          <LineChartCard 
            title={lcs("hypotheses")} 
            interview={false} 
            hypothesisCount={hypothesisCount} 
            labels={[...hypothesisWeekLabels]} 
            datasets={[...hypothesisWeekData].splice(0,12)} 
          />
        </div>
      </div>

      <div className={cx("row", c.chartRow)}>
        <div className="col col-12">
          <LineChartCard 
            title={lcs("interviews")} 
            interview={true} 
            interviewsCount={interviewsCount} 
            labels={[...interviewsWeekLabels]} 
            datasets={[...interviewsWeekData].splice(0,12)} 
          />
        </div>
      </div>

      <h2 className={c.pageTitle}>{lcs("projects")} ({projectData.length})</h2>
      {projectData
        .sort((p1, p2) => p1.name.localeCompare(p2.name))
        .map(p => (
          <div key={p.id} className={c.chartRow}>
            <Route 
              path={`${path}/:project_id(${p.id})?`} 
              component={(routeProps) => <AnalyticCard data={p} {...routeProps} />} 
            />
            <Route 
              path={`${path}/${p.id}`} 
              component={() =>
                <Details 
                  projectData={p} 
                  hLabels={hypothesisWeekLabels} 
                  hDatasets={hypothesisWeekData}
                  iLabels={interviewsWeekLabels} 
                  iDatasets={interviewsWeekData} 
                />} 
            />
          </div>
        ))
      }
    </div>
  );
  
}

export default redux(Performance);