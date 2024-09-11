import * as React from 'react';
import * as Util from 'seed/util'
import cx from 'classnames'
import { hasProjectPermission, hasCohortPermission } from 'components/util/Permissions';
import { Link } from 'react-router-dom'
import redux from 'seed/redux';
 
import { NavLink } from 'react-router-dom';
import Select from "react-select";
import { lcs } from 'components/util/Locales'
import Loading from 'seed/components/helpers/Loading'
import CanvasNav from 'components/navigation/sideNav/Canvas'
import ProjectNav from 'components/navigation/sideNav/Project'
import MembersNav from 'components/navigation/sideNav/Members'
import { waizNav } from "components/navigation/sideNav/waiz";

import { selectStyle } from 'components/navigation/SideNav.module.js'
import c from "resources/css/navigation/SideNav.module.css";

class SideNav extends React.Component
{
  render()
  {
    const { url } = this.props.match;
    const userId = parseInt(sessionStorage.getItem('id'));
    let projects = this.props.projects
      .filter(p =>
        (p.admin_id == userId || p.mentor_ids.includes(userId) || p.member_ids.includes(userId) ||
          (p.cohort != null && (p.cohort.admin_id == userId || p.cohort.mentor_ids.includes(userId) || p.cohort.instructor_ids.includes(userId)))))
      .sort((p1, p2) => p2.id - p1.id);
    let cohortsAdmin = this.props.cohorts
      .sort((p1, p2) => p2.id - p1.id);

    let cohortSelect =
      cohortsAdmin
        .sort((ch1, ch2) => ch1.name.localeCompare(ch2.name))
        .map(ch => ({ label: ch.name, value: ch.id }))
    cohortSelect = [{ label: lcs("personal_projects"), value: 0 }].concat(cohortSelect)

    let projectId = localStorage.getItem('projectId');
    let cohortId = localStorage.getItem('cohortId');

    if (projectId == 0 || projectId == null) {
      if (cohortId == null) {
        if (projects.length > 0) {
          localStorage.setItem('projectId', projects[0].id);
          localStorage.setItem('cohortId', projects[0].cohort_id ? projects[0].cohort_id : 0)
          this.props.history.replace("/");
        }
      } else {
        let temp = projects.filter(p => p.cohort_id == null)
        if (temp.length > 0 && (cohortId == 0 || cohortId == null)) {
          localStorage.setItem('projectId', temp[0].id);
          localStorage.setItem('cohortId', temp[0].cohort_id ? temp[0].cohort_id : 0)
          this.props.history.replace("/");
        }
      }
    }

    projects = projects.filter(
      p => cohortId == 0 ? p.cohort_id == null :
        p.cohort_id == cohortId)
      .sort((p1, p2) => p1.name.localeCompare(p2.name))
    let project = Util.get(projects, projectId);
    let cohort = Util.get(cohortsAdmin, cohortId)


    const projectSelect = projects
      .map(p => ({
        label: p.name,
        value: p.id
      }));

    const addProjectCondition =
      (project.id != null && hasProjectPermission(project, ["MEMBER"]) && project.cohort_id == null && projectSelect.length < 3) ||
      (cohort.id != null && hasCohortPermission(cohort, ["ADMIN"])) ||
      ((cohortId == 0 || cohortId == undefined) && projectSelect.length == 0);

    if (addProjectCondition)
      projectSelect.push({
        label: lcs("new_project"),
        value: "new"
      });

    let projectPos = 0;
    for (let i = 0; i < projectSelect.length; i++)
      if (projectSelect[i].value == projectId)
        projectPos = i;

    let cohortPos = 0;
    for (let i = 0; i < cohortSelect.length; i++)
      if (cohortSelect[i].value == cohortId)
        cohortPos = i;

    const nav =
      project.id != null && this.state.loading == false ?
        <div>
          <CanvasNav project={project} match={this.props.match} />
          <ProjectNav project={project} match={this.props.match} />
          <MembersNav project={project} match={this.props.match} />
          {/* <waizNav project={project} match={this.props.match} /> */}
        </div> : <div style={{ paddingTop: "50px" }}>{this.state.loading ? <Loading /> : null}</div>

    return (
      <div className={c.module}>
        <div className={c.container}>
          <div className={c.flexColumnElement}>
            <div className={c.header}>

              {/* Menu */}
              <div className={c.menu}>
                <div className={c.elementLeft}>
                  <div>
                    <img className={c.logo} alt="Logo"
                      src={require("resources/images/waiz_logo_svg_white.svg")} />
                  </div>
                </div>
                <div className={c.elementRight}
                  onClick={this.props.onBurgerClick}>
                  <img className={c.menuHamburguer} alt="Menu"
                    src={require("resources/images/menu-extended.svg")} />
                </div>
              </div>
            </div>
            <div className={c.body}>
              <div className={c.element} />

              {/* Cohorts  */}
              {cohortSelect.length > 1 ?
                <div className={c.element}>
                  <div className={c.sectionTitle}>{lcs("cohorts")}</div>
                  <div className={c.select}>
                    <Select
                      styles={selectStyle}
                      value={cohortSelect[cohortPos]}
                      onChange={this.onSelectCohort}
                      options={cohortSelect} />
                  </div>
                </div> : null
              }


              {/* Projects */}
              <div className={cx(c.projects, c.element)}>
                <div className={c.sectionTitle}>{lcs("projects")}&nbsp;&nbsp;
                {(project.id != null && hasProjectPermission(project, ["MEMBER"]) && project.cohort_id == null) ||
                    (cohort.id != null && hasCohortPermission(cohort, ["ADMIN"])) ?
                    <Link to={`${url}/project_admin/${projectId}`}>
                      <i className={"fas fa-ellipsis-h"} style={{ color: "#928daf" }} />
                    </Link> : null}
                  {addProjectCondition ?
                    <Link to={"/projects/new"} style={{ float: "right", marginRight: "12px" }}>
                      <i className={"fas fa-plus"} style={{ color: "#928daf" }} />
                    </Link> : null}
                </div>

                <div className={c.select}>
                  <Select
                    styles={selectStyle}
                    value={projectSelect[projectPos]}
                    onChange={this.onSelectProject}
                    options={projectSelect} />
                </div>
              </div>

              {/* Nav */}
              {nav}
               
                <div className={c.element}>
                {/* <Link to={"https://app.gamechangerfunnel.com/"} target="_blank">Game Changer Funnel</Link>
                <Link to={"https://www.messengerx.io/mx-waiz"} target="_blank">Ask wAIz</Link> */}
              
              <NavLink
                to={{pathname: "https://www.gamechangerfunnel.com/pro?am_id=waizai8003"}}
                target="_blank"
                className={c.navButton}
                activeClassName={c.active}>
                <button className={c.button}> 
                  Game Changer Funnel
                </button>
              </NavLink>     
              <NavLink
                to={{pathname: "http://exoasia.org/aitools"}}
                target="_blank"
                className={c.navButton}
                activeClassName={c.active}>
                <button className={c.button}> 
                  AI Tools
                </button>
              </NavLink>
              <NavLink
                to={{pathname: "https://www.smartsheet.com"}}
                target="_blank"
                className={c.navButton}
                activeClassName={c.active}>
                <button className={c.button}> 
                  SmartSheet
                </button>
              </NavLink>

              <NavLink
                to={{pathname: "https://miro.com/login/"}}
                target="_blank"
                className={c.navButton}
                activeClassName={c.active}>
                <button className={c.button}> 
                  Miro
                </button>
              </NavLink>
              
              <NavLink
                to={{pathname: "https://www.canva.com/en_ph/"}}
                target="_blank"
                className={c.navButton}
                activeClassName={c.active}>
                <button className={c.button}> 
                  Canva
                </button>
              </NavLink>

              </div>
              
              
            </div>
          </div>
        </div>
      </div>
    );
  }

  constructor(props)
  {
    super(props);
    this.state = { loading: false };

    this.onSelectCohort = this.onSelectCohort.bind(this);
    this.onSelectProject = this.onSelectProject.bind(this);
  }

  componentDidMount()
  {
    const userId = sessionStorage.getItem('id');
    const cohortId = localStorage.getItem('cohortId') ? localStorage.getItem('cohortId') : 0
    this.props.getUserProjectList(userId, cohortId);
    this.props.getUserCohortList(userId);
  }

  onSelectCohort = cohort =>
  {
    const userId = sessionStorage.getItem('id');
    const cohortId = cohort.value ? parseInt(cohort.value) : 0;
    const project = this.props.projects.filter(p => p.cohort_id == cohortId || (cohortId == 0 && p.cohort_id == null))[0]
    this.setState({ loading: true })
    if (project == null) {
      const callback = (res) =>
      {
        this.setState({ loading: false })
        if (res.ok == false) return;
        const project = res.body.filter(p => p.cohort_id == cohortId || (cohortId == 0 && p.cohort_id == null))[0]
        if (project == null) {
          localStorage.setItem('projectId', 0);
          localStorage.setItem('cohortId', cohortId)
          this.props.history.replace("/");
        } else this.onSelectProject({ value: project.id })
      }
      this.props.getUserProjectList(userId, cohortId, callback);
    } else this.onSelectProject({ value: project.id })
  };

  onSelectProject = projectV =>
  {
    const value = projectV.value;
    if (value == "new")
      return this.props.history.push('/projects/new');
    const project = this.props.projects.filter(p => p.id == parseInt(value))[0]
    localStorage.setItem('projectId', project ? project.id : 0);
    localStorage.setItem('cohortId', project && project.cohort_id ? project.cohort_id : 0)
    this.props.history.replace("/");
  };
}

export default redux(SideNav);
