import React from 'react'
import c from 'resources/css/search/SearchComponent.module.css';
import cx from 'classnames';
import { Switch, Route, NavLink, withRouter } from 'react-router-dom'
import { LocationOn, People, Timeline } from '@material-ui/icons';
//Components
import Projects from './Projects';
import Users from './Users';

class SearchContent extends React.Component
{
  render()
  {
    var currentPath = this.props.location.pathname,
      parentPath = currentPath.substring(0, currentPath.lastIndexOf("/"));

    return (
      <div className={c.module}>

        <div>
          <p className={c.resultsTitle}>Showing results for "Leads"</p>
        </div>

        <div className={c.searchBodyInner}>
          <div className={c.searchBodyFilters}>
            <Switch>
              <Route path='/search/projects' render={(props) => (
                <div>
                  <p className={c.filtersTitle}>Industry</p>
                  <div>
                    <NavLink activeClassName={c.active} className={c.btn} exact to='/search/projects'>All</NavLink>
                    <NavLink activeClassName={c.active} className={c.btn} to='/search/projects/automotive'>Automotive</NavLink>
                    <NavLink activeClassName={c.active} className={c.btn} to='/search/projects/communications'>Communications</NavLink>
                    <NavLink activeClassName={c.active} className={c.btn} to='/search/projects/technology'>Technology</NavLink>
                  </div>
                </div>
              )} />
              <Route path='/search/users' render={(props) => (
                <div>
                  <p className={c.filtersTitle}>Skills</p>
                  <div>
                    <NavLink activeClassName={c.active} className={c.btn} exact to='/search/users'>All</NavLink>
                    <NavLink activeClassName={c.active} className={c.btn} to='/search/users/sales'>Sales</NavLink>
                    <NavLink activeClassName={c.active} className={c.btn} to='/search/users/engineering'>Engineering</NavLink>
                    <NavLink activeClassName={c.active} className={c.btn} to='/search/users/management'>Management</NavLink>
                  </div>
                </div>
              )} />
            </Switch>
          </div>

          <div className={c.searchBodyResults}>
            <div className={c.typeButtons}>
              <NavLink activeClassName={c.active} to='/search/projects' className={c.btn}><span><Timeline /></span>Projects</NavLink>
              <NavLink activeClassName={c.active} to='/search/users' className={c.btn}><span><People /></span> Users</NavLink>
            </div>

            <Switch>
              <Route path='/search/projects' component={Projects} />
              <Route path='/search/users' component={Users} />
            </Switch>
          </div>
        </div>

      </div>
    )
  }
}

export default withRouter(SearchContent);