/*
__Seed builder__v1.0
*/
import * as React from 'react'
import c from 'resources/css/search/Search.module.css';
import cx from 'classnames';
import { Switch, Route, NavLink, withRouter, Redirect } from 'react-router-dom'
//Components
import Hypothesis from './Hypothesis';
import Interviews from './Interviews';
import Projects from './Projects';
import Users from './Users';
import { lcs } from 'components/util/Locales';


class SearchComponent extends React.Component
{
  render()
  {
    const { path, url } = this.props.match;
    const { search } = this.props.match.params;

    return (
      <section className={c.module}>

        <div className={c.searchBody}>
          <div>
            <p className={c.resultsTitle}>{lcs("showing_results_for")} "{search}"</p>
          </div>

          <div className={c.searchBodyInner}>
            <div className={c.searchBodyFilters}>
              <p className={c.filtersTitle}>{lcs("filter")}</p>
              <NavLink activeClassName={c.active} className={c.btn} exact to={`${url}/hypothesis`}>{lcs("hypotheses")}</NavLink>
              <NavLink activeClassName={c.active} className={c.btn} to={`${url}/interviews`}>{lcs("interviews")}</NavLink>
              <NavLink activeClassName={c.active} className={c.btn} to={`${url}/projects`}>{lcs("projects")}</NavLink>
              <NavLink activeClassName={c.active} className={c.btn} to={`${url}/users`}>{lcs("users")}</NavLink>
            </div>

            <div className={c.searchBodyResults}>

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

  /*
  * Business logic
  */

  constructor(props)
  {
    super(props);
    this.state = {};
  }
}

export default withRouter(SearchComponent);
