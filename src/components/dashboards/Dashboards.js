import React from 'react'
import { NavLink, Routes, Route, Navigate, useParams, useLocation, useNavigate } from 'react-router-dom';
import c from 'resources/css/dashboards/Dashboards.module.css';
import cx from 'classnames';
import { lcs } from 'components/util/Locales'
import Performance from 'components/dashboards/pages/Performance';
import Industry from 'components/dashboards/pages/Industry';
import Benchmark from 'components/dashboards/pages/Benchmark';
import Cohort from 'components/dashboards/pages/Cohort';

function Dashboards(props) {

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const cohortId = localStorage.getItem('cohortId');

  const url = location.pathname.replace(/\/$/, '');
  const path = url;

  return (

    <div className={c.module}>
      <div className={c.dashboardsBody}>
        <div className={c.dashboardsMenu}>
          <NavLink activeClassName={c.active} className={c.btn} to={`${url}/performance`}>
            {lcs("performance")}
          </NavLink>

          {cohortId != null && cohortId != 0 ? (
            <NavLink activeClassName={c.active} className={c.btn} to={`${url}/cohort`}>
              {lcs("cohort")}
            </NavLink>
          ) : null}

          <NavLink activeClassName={c.active} className={c.btn} to={`${url}/industry`}>
            {lcs("industry")}
        </NavLink>
        </div>

        <Routes>
          <Route path={`${path}/performance`} element={Performance} />
          <Route path={`${path}/benchmark`} element={Benchmark} />
          <Route path={`${path}/cohort`} element={Cohort} />
          <Route path={`${path}/industry`} element={Industry} />
          <Navigate to={`${path}/performance`} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboards;