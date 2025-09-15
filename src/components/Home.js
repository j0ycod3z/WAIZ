import * as React from 'react';
import * as Util from 'seed/util';
import redux from 'seed/redux';
import cx from 'classnames';
import { Switch, Route, Redirect } from 'react-router-dom';

import CanvasPanel from 'components/canvas/Panel';
import ProjectProfile from 'components/projects/Profile';
import Interviews from 'components/interviews/Interviews';
import KnowledgeBase from 'components/knowledge_base/Panel';
import Incubation from 'components/knowledge_base/Incubation';
import UserProfile from 'components/users/Profile';
import ProjectAdmin from 'components/project_admin/Admin'

import Search from 'components/search/Search'
import Dashboards from 'components/dashboards/Dashboards'
import Settings from 'components/users/Settings';
 
import TopNav from 'components/navigation/TopNav';
import SideNav from 'components/navigation/SideNav';
import Tour from 'components/navigation/Tour';
// import WaizNav from 'components/navigation/sideNav/waiz';

import c from 'resources/css/Home.module.css';
// import GameChangerFunnel from './gamechangerfunnel/GCF';
// import Chatbot from './chatbot/Chatbot';

class Home extends React.Component {
  render() {
    const { path } = this.props.match;
    const { projects } = this.props;

    if (sessionStorage.getItem('id') == null) {
      if (localStorage.getItem('id') != null) {
        sessionStorage.setItem('id', localStorage.getItem('id'));
        sessionStorage.setItem('token', localStorage.getItem('token'));
      }
      else return <></>
    }

    const projectId = localStorage.getItem('projectId');
    const defProject = projects.find((project) => project.id == projectId) || {};
    const defCanvas = defProject.id != null ? defProject.canvas.find((canvas) => canvas.type.type == defProject.canvas_type2.type) || {} : {};
    
    return (
      <div className={c.module} >
        <div className={c.columns}>
          <div className={c.rows}>
            {this.state.sidenav &&
            <div className={c.sidenav}>
              <SideNav onBurgerClick={this.onBurgerClick} sidenav={this.state.sidenav} match={this.props.match} />
            </div>}
          </div>
          <div className={cx(c.rightRow, c.rows)}>
            <Route
              path={[
                `${path}/c/:canvas_id(\\d+)`,
                `${path}/knowledge_base`,
                `${path}/project_admin`,
                `${path}/dashboards`,
                `${path}/profile/:user_id(\\d+)`,
                `${path}/:section_id/:project_id(\\d+)`,
                `${path}/:section_id?`,
                // `${path}/gcf`,
                // `chat`
              ]}
 
              render={ () =>
                <TopNav onBurgerClick={this.onBurgerClick} sidenav={this.state.sidenav} match={this.props.match} />
              }
            />
            <div className={c.content}>
              <Switch>
                <Route path={`${path}/c/:canvas_id(\\d+)`} component={CanvasPanel} />
                <Route path={`${path}/project_profile/:project_id(\\d+)`} component={ProjectProfile} />
                <Route path={`${path}/interviews/:project_id(\\d+)`} component={Interviews} />
                <Route path={`${path}/knowledge_base/:course_id(\\d+)`} component={KnowledgeBase} />
                <Route path={`${path}/incubation_acceleration`} component={Incubation} />
                <Route path={`${path}/profile/:user_id(\\d+)`} component={UserProfile} />
                <Route path={`${path}/project_admin/:project_id(\\d+)`} component={ProjectAdmin} />
                <Route path={`${path}/search/:search`} component={Search} />
                <Route path={`${path}/dashboards`} component={Dashboards} />
                <Route path={`${path}/settings`} component={Settings} />
                {/* <Route path={`${path}/gcf`} component={GameChangerFunnel} />
                <Route path={`${path}/chat`} component={Chatbot} /> */}

                {defCanvas.id != null &&
                  <Redirect to={`${path}/c/${defCanvas.id}`} />
                }
              </Switch>
              <Tour history={this.history} match={this.props.match} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = { sidenav: true };
    this.onBurgerClick = this.onBurgerClick.bind(this);
  }

  componentDidMount() {
    const userId = sessionStorage.getItem('id');
    const userIdR = localStorage.getItem('id')
    if (userId === null && userIdR === null)
      return this.props.history.replace('/login');
  }

  onBurgerClick() {
    this.setState(prevState => ({
      sidenav: !prevState.sidenav
    }));
  }
}

export default redux(Home);
