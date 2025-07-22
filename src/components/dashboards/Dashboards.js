import React from 'react'
import { NavLink, Routes, Route, useMatch, useResolvedPath, Navigate } from 'react-router-dom';
import c from 'resources/css/dashboards/Dashboards.module.css';
import { lcs, lc } from 'components/util/Locales'

import Performance from 'components/dashboards/pages/Performance';
import Industry from 'components/dashboards/pages/Industry';
import Benchmark from 'components/dashboards/pages/Benchmark';
import Cohort from 'components/dashboards/pages/Cohort';

function Dashboards() {
  const match = useMatch("/dashboards/*");
  const base = match?.pathnameBase || "/dashboards";
  const cohortId = localStorage.getItem('cohortId');

  return (
    <div className={c.module}>
      <div className={c.dashboardsBody}>
        <div className={c.dashboardsMenu}>
          <NavLink
            className={({ isActive }) => isActive ? `${c.btn} ${c.active}` : c.btn}
            to={`${base}/performance`}
          >
            {lcs("performance")}
          </NavLink>

          {cohortId !== null && cohortId !== "0" && (
            <NavLink
              className={({ isActive }) => isActive ? `${c.btn} ${c.active}` : c.btn}
              to={`${base}/cohort`}
            >
              {lcs("cohort")}
            </NavLink>
          )}

          <NavLink
            className={({ isActive }) => isActive ? `${c.btn} ${c.active}` : c.btn}
            to={`${base}/industry`}
          >
            {lcs("industry")}
          </NavLink>
        </div>

        <Routes>
          <Route path="performance" element={<Performance />} />
          <Route path="benchmark" element={<Benchmark />} />
          <Route path="cohort" element={<Cohort />} />
          <Route path="industry" element={<Industry />} />
          <Route path="*" element={<Navigate to="performance" replace />} />
        </Routes>
      </div>
    </div>
  );
}