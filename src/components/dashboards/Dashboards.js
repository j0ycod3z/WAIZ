import React from 'react'
import { NavLink, withRouter, Switch, Route, Redirect } from 'react-router-dom';
import c from 'resources/css/dashboards/Dashboards.module.css';
import cx from 'classnames';
import { lcs } from 'components/util/Locales'

import Performance from 'components/dashboards/pages/Performance';

import Industry from 'components/dashboards/pages/Industry';
import Benchmark from 'components/dashboards/pages/Benchmark';
import Cohort from 'components/dashboards/pages/Cohort';

function Dashboards(props) {

  const { url, path } = props.match;
  const cohortId = localStorage.getItem('cohortId');

  return (

    <div className={c.module}>
      <div className={c.dashboardsBody}>
        <div className={c.dashboardsMenu}>
          <NavLink activeClassName={c.active} className={c.btn} to={`${url}/performance`}>
            {lcs("performance")}

          {cohortId != null && cohortId != 0 ? (
            <NavLink activeClassName={c.active} className={c.btn} to={`${url}/cohort`}>
              {lcs("cohort")}
            </NavLink>
          ) : null}

          <NavLink activeClassName={c.active} className={c.btn} to={`${url}/industry`}>
            {lcs("industry")}
        </NavLink>
        </NavLink>
        </div>

        <Switch>
          <Route path={`${path}/performance`} component={Performance} />
          <Route path={`${path}/benchmark`} component={Benchmark} />
          <Route path={`${path}/cohort`} component={Cohort} />
          <Route path={`${path}/industry`} component={Industry} />
          <Redirect to={`${path}/performance`} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(Dashboards);