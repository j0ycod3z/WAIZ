import * as React from 'react'
import { Switch, Route, NavLink, withRouter, Redirect } from 'react-router-dom'
import cx from 'classnames';

import Hypothesis from './Hypothesis';
import Interviews from './Interviews';
import Projects from './Projects';
import Users from './Users';
import { lcs } from 'components/util/Locales';

import c from 'resources/css/search/Search.module.css';

function SearchComponent(props) {
  const { path, url, params: { search } } = props.match;

  return (
    <section className={cx(c.module, 'container')}>
      <div style={{paddingBlock: '15px'}}>
        <h4 className={c.resultsTitle}>{`${lcs("showing_results_for")} "${search}"`}</h4>
        <div className={cx('row')}>
          <div className={cx('col-md-4')}>
            <h4>{lcs("filter")}</h4>
            <div className={c.filters}>
              <NavLink activeClassName={c.active} exact to={`${url}/hypothesis`}>{lcs("hypotheses")}</NavLink>
              <NavLink activeClassName={c.active} to={`${url}/interviews`}>{lcs("interviews")}</NavLink>
              <NavLink activeClassName={c.active} to={`${url}/projects`}>{lcs("projects")}</NavLink>
              <NavLink activeClassName={c.active} to={`${url}/users`}>{lcs("users")}</NavLink>
            </div>
          </div>
          <div className={cx(c.searchBodyResults, 'col-md-8')}>
            <Switch>
              <Route path={`${path}/hypothesis`} component={Hypothesis} />
              <Route path={`${path}/interviews`} component={Interviews} />
              <Route path={`${path}/projects`} component={Projects} />
              <Route path={`${path}/users`} component={Users} />
              <Redirect to={`${path}/hypothesis`} />
            </Switch>
          </div>
        </div>
      </div>
    </section>
  );
}

export default withRouter(SearchComponent);