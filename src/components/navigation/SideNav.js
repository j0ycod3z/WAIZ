import { useEffect, useState, useCallback } from 'react';
import * as Util from 'seed/util';
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

import waizLogo from 'resources/images/waiz_logo_white.svg';
import menuExtended from 'resources/images/menu-extended.svg';

function SideNav(props) {
  const {
    match,
    projects = [],
    cohorts = [],
    history,
    getUserProjectList,
    getUserCohortList,
    onBurgerClick
  } = props;
  const { url } = match;

  const userId = parseInt(sessionStorage.getItem('id'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userId = sessionStorage.getItem('id');
    const cohortId = localStorage.getItem('cohortId') ? localStorage.getItem('cohortId') : 0;
    getUserProjectList(userId, cohortId);
    getUserCohortList(userId);
  }, [getUserProjectList, getUserCohortList]);
  
  let filteredProjects = projects
    .filter(
      (p) =>
        p.admin_id == userId ||
        p.mentor_ids.includes(userId) ||
        p.member_ids.includes(userId) ||
        (p.cohort != null &&
          (p.cohort.admin_id == userId ||
            p.cohort.mentor_ids.includes(userId) ||
            p.cohort.instructor_ids.includes(userId)))
    )
    .sort((p1, p2) => p2.id - p1.id);

  let cohortsAdmin = cohorts.sort((p1, p2) => p2.id - p1.id);

  let cohortSelect = cohortsAdmin
    .sort((ch1, ch2) => ch1.name.localeCompare(ch2.name))
    .map((ch) => ({ label: ch.name, value: ch.id }));
  cohortSelect = [{ label: lcs("personal_projects"), value: 0 }].concat(cohortSelect);

  const projectId = localStorage.getItem('projectId');
  const cohortId = localStorage.getItem('cohortId');

  if (projectId == 0 || projectId == null) {
    if (cohortId == null) {
      if (filteredProjects.length > 0) {
        localStorage.setItem('projectId', filteredProjects[0].id);
        localStorage.setItem('cohortId', filteredProjects[0].cohort_id ? filteredProjects[0].cohort_id : 0);
        history.replace("/");
      }
    } else {
      let temp = filteredProjects.filter((p) => p.cohort_id == null);
      if (temp.length > 0 && (cohortId == 0 || cohortId == null)) {
        localStorage.setItem('projectId', temp[0].id);
        localStorage.setItem('cohortId', temp[0].cohort_id ? temp[0].cohort_id : 0);
        history.replace("/");
      }
    }
  }

  filteredProjects = filteredProjects
    .filter((p) => (cohortId == 0 ? p.cohort_id == null : p.cohort_id == cohortId))
    .sort((p1, p2) => p1.name.localeCompare(p2.name));

  let project = Util.get(filteredProjects, projectId);
  let cohort = Util.get(cohortsAdmin, cohortId);

  const projectSelect = filteredProjects.map((p) => ({ label: p.name, value: p.id }));

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

  const nav = project.id != null && loading == false ?
    <>
      <CanvasNav project={project} match={match} />
      <ProjectNav project={project} match={match} />
      <MembersNav project={project} match={match} />
      {/* <waizNav project={project} match={match} /> */}
    </> :
    <div style={{ paddingTop: "10px" }}>{loading && <Loading />}</div>

  const onSelectCohort = useCallback((cohort) => {
    const userId = sessionStorage.getItem('id');
    const cohortId = cohort.value ? parseInt(cohort.value) : 0;
    const project = projects.filter(p => p.cohort_id == cohortId || (cohortId == 0 && p.cohort_id == null))[0]
    
    setLoading(true);

    if (project == null) {
      const callback = (res) => {
        setLoading(false);
        if (res.ok == false) return;

        const project = res.body.filter(p => p.cohort_id == cohortId || (cohortId == 0 && p.cohort_id == null))[0]
        if (project == null) {
          localStorage.setItem('projectId', 0);
          localStorage.setItem('cohortId', cohortId)
          history.replace("/");
        } else onSelectProject({ value: project.id })
      }
      getUserProjectList(userId, cohortId, callback);
    } else onSelectProject({ value: project.id })
  }, [projects, getUserProjectList, history]);

  const onSelectProject = useCallback((projectV) => {
    const value = projectV.value;
    if (value == "new") return history.push('/projects/new');
    
    const project = projects.filter(p => p.id == parseInt(value))[0]
    localStorage.setItem('projectId', project ? project.id : 0);
    localStorage.setItem('cohortId', project && project.cohort_id ? project.cohort_id : 0)
    history.replace("/");
  }, [projects, history]);

  return (
    <div className={c.module}>
      <div className={c.container}>
        <div className={c.flexColumnElement}>
          <div className={c.header}>
            <div className={c.menu}>
              <div className={c.elementLeft}>
                <div>
                  <img className={c.logo} alt="Logo"
                    src={waizLogo} />
                </div>
              </div>
              <div onClick={onBurgerClick}>
                <img className={c.menuHamburguer} alt="Menu" src={menuExtended} />
              </div>
            </div>
          </div>
          <div className={c.body}>
            {cohortSelect.length > 1 &&
              <div className={c.element}>
                <div className={c.sectionTitle}>{lcs("cohorts")}</div>
                <div className={c.select}>
                  <Select
                    styles={selectStyle}
                    value={cohortSelect[cohortPos]}
                    onChange={onSelectCohort}
                    options={cohortSelect} />
                </div>
              </div>
            }

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
                <Select styles={selectStyle} value={projectSelect[projectPos]} onChange={onSelectProject} options={projectSelect} />
              </div>
            </div>
            {nav}
            
            <div className={c.element}>
            {/* <Link to={"https://app.gamechangerfunnel.com/"} target="_blank">Game Changer Funnel</Link>
            <Link to={"https://www.messengerx.io/mx-waiz"} target="_blank">Ask wAIz</Link> */}
              <NavLink
                to={{pathname: "https://chatgpt.com/g/g-UPhtesy6L-waiz"}}
                target="_blank"
                className={c.navButton}
                activeClassName={c.active}
              >
                <button className={c.button}>wAiz GPT AI Mentor</button>
              </NavLink>  
              <NavLink
                to={{pathname: "https://www.gamechangerfunnel.com/pro?am_id=waizai8003"}}
                target="_blank"
                className={c.navButton}
                activeClassName={c.active}
              >
                <button className={c.button}> Game Changer Funnel</button>
              </NavLink>     
              <NavLink
                to={{pathname: "http://exoasia.org/aitools"}}
                target="_blank"
                className={c.navButton}
                activeClassName={c.active}
              >
                <button className={c.button}> AI Tools</button>
              </NavLink>
              <NavLink
                to={{pathname: "https://www.smartsheet.com"}}
                target="_blank"
                className={c.navButton}
                activeClassName={c.active}
              >
                <button className={c.button}> SmartSheet</button>
              </NavLink>
              <NavLink
                to={{pathname: "https://miro.com/login/"}}
                target="_blank"
                className={c.navButton}
                activeClassName={c.active}
              >
                <button className={c.button}>Miro</button>
              </NavLink>
              <NavLink
                to={{pathname: "https://www.canva.com/en_ph/"}}
                target="_blank"
                className={c.navButton}
                activeClassName={c.active}
              >
                <button className={c.button}>Canva</button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default redux(SideNav);