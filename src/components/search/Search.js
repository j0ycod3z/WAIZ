import * as React from 'react'
import { NavLink, Route, Routes, Navigate, useParams, useLocation, useNavigate } from 'react-router-dom';
import cx from 'classnames';

import Hypothesis from './Hypothesis';
import Interviews from './Interviews';
import Projects from './Projects';
import Users from './Users';
import { lcs } from 'components/util/Locales';

import c from 'resources/css/search/Search.module.css';

function SearchComponent(props) {
  const location = useLocation();
  const { search } = useParams();

  const basePath = location.pathname.replace(/\/(hypothesis|interviews|projects|users)$/, '');

  return (
    <section className={cx(c.module, 'container')}>
      <div style={{paddingBlock: '15px'}}>
        <h4 className={c.resultsTitle}>{`${lcs("showing_results_for")} "${search}"`}</h4>
        <div className={cx('row')}>
          <div className={cx('col-md-4')}>
            <h4>{lcs("filter")}</h4>
            <div className={c.filters}>
              <NavLink
                to={`${basePath}/hypothesis`}
                className={({ isActive }) => cx(isActive && c.active)}
                end
              >
                {lcs("hypotheses")}
              </NavLink>
              <NavLink
                to={`${basePath}/interviews`}
                className={({ isActive }) => cx(isActive && c.active)}
              >
                {lcs("interviews")}
              </NavLink>
              <NavLink
                to={`${basePath}/projects`}
                className={({ isActive }) => cx(isActive && c.active)}
              >
                {lcs("projects")}
              </NavLink>
              <NavLink
                to={`${basePath}/users`}
                className={({ isActive }) => cx(isActive && c.active)}
              >
                {lcs("users")}
              </NavLink>
            </div>
          </div>
          <div className={cx(c.searchBodyResults, 'col-md-8')}>
            <Routes>
              <Route path="hypothesis" element={<Hypothesis />} />
              <Route path="interviews" element={<Interviews />} />
              <Route path="projects" element={<Projects />} />
              <Route path="users" element={<Users />} />
              <Route path="*" element={<Navigate to="hypothesis" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchComponent;