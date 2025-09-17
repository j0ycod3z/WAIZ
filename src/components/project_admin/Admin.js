import * as React from 'react';
import { useState, useEffect } from 'react';
import redux from 'seed/redux';
import cx from 'classnames';
import * as Util from 'seed/util'
import { Route, Link } from 'react-router-dom'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Modal from 'components/helpers/Modal';
import AddMember from 'components/project_admin/AddMember';
import BulkLoad from 'components/project_admin/Bulk';

import { hasProjectPermission, hasCohortPermission } from 'components/util/Permissions';

import c from 'components/project_admin/Admin.module.scss';
import { lcs } from 'components/util/Locales';

function ProjectAdmin(props) {
  const { match, projects: projectsProp, cohorts, getUserProjectList, getUserCohortList, setProject, setCohort, deleteProject } = props;
  const { url, path } = match;

  const [optionMenu, setOptionMenu] = useState(null);

  const userId = parseInt(sessionStorage.getItem('id'));
  
  const cohortId = parseInt(localStorage.getItem('cohortId')) !== 0 ? parseInt(localStorage.getItem('cohortId')) : null;
  
  let projects = projectsProp.filter((p) => 
    p != null && (
      p.admin_id === userId || 
      p.mentor_ids.includes(userId) ||
      p.member_ids.includes(userId) ||
      (
        (p.cohort != null && (p.cohort.admin_id === userId)) ||
        p.cohort.mentor_ids.includes(userId) ||
        p.cohort.instructor_ids.includes(userId)
      )
    ) && p.cohort_id === cohortId
  ).sort((p1, p2) => p1.name.localeCompare(p2.name));
  
  let cohort = cohorts.find((ch) => ch.id === cohortId);
  const addCondition = (cohortId !== null && cohortId > 0) || ((cohortId === 0 || cohortId === null) && projects.length < 3);
  
  const hasPermission = (cohort != null && hasCohortPermission(cohort, ["ADMIN"])) || (projects.length > 0 && projects[0].cohort == null && hasProjectPermission(projects[0], ["MEMBER", "MENTOR"]));

  useEffect(() => {
    const userIdLocal = sessionStorage.getItem('id');
    const cohortIdLocal = localStorage.getItem('cohortId') != 0 ? localStorage.getItem('cohortId') : 0;
    getUserProjectList(userIdLocal, cohortIdLocal);
    getUserCohortList(userIdLocal);
  }, [getUserProjectList, getUserCohortList]);
  
  const openOptionMenu = (e) => setOptionMenu(e.currentTarget);
  const closeOptionMenu = () => setOptionMenu(null);

  const onClickDelete = (id, userIdDel, role) => {
    let res = [];
    if (role === "member") {
      const project = Util.get(projectsProp, id);
      res = project.member_ids;
    }
    if (role === "mentor") {
      const project = Util.get(projectsProp, id);
      res = project.mentor_ids;
    }
    if (role === "instructor") {
      const cohort = Util.get(cohorts, id);
      res = cohort.instructor_ids;
    }
    if (role === "iadmin") {
      const cohort = Util.get(cohorts, id);
      res = cohort.mentor_ids;
    }

    alert(`${res} ${userIdDel}`);

    for (var i = 0; i < res.length; i++)
      if (res[i] === userIdDel)
        res.splice(i, 1);

    if (role === "member")
      setProject(id, { "member_ids": res });
    if (role === "mentor")
      setProject(id, { "mentor_ids": res });
    if (role === "instructor")
      setCohort(id, { "instructor_ids": res });
    if (role === "iadmin")
      setCohort(id, { "mentor_ids": res });
  };

  const onClickEditProject = () => {
    const projectId = parseInt(optionMenu.title);
    let project = projectsProp.find((p) => p.id === projectId);
    let projectName = window.prompt(lcs("project_name"), project.name);

    if (projectName != null)
      setProject(projectId, { "name": projectName });
    setOptionMenu(null);
  };
  const onClickDeleteProject = () => {
    const projectId = optionMenu.title;
    const currentProjectId = parseInt(localStorage.getItem('projectId'));
    
    deleteProject(projectId);
    if (currentProjectId === projectId) {
      localStorage.setItem('projectId', null);
      localStorage.setItem('cohortId', null);
      window.location.href = "";
    }
    setOptionMenu(null);
  };
  
  const renderUser = (projectId, user, role, modifyPermission = false) => (
    <div key={`${role}-${user.id}`} className={cx(c.member)}>
      <Link to={`/app/profile/${user.id}`} className='d-flex flex-row align-items-center'>
        <div
          className={cx(c.profilePic)}
          style={{ backgroundImage: `url("${user.image_url}")` }}
          alt="profileImage"
        />
        <div className={cx(c.memberInfo)}>
          <b>{user.first_name} {user.last_name}</b>
          <p>{user.email}</p>
        </div>
      </Link>
      {(modifyPermission && role !== "admin") &&
        <div className={c.deleteButton}>
          <button onClick={() => onClickDelete(projectId, user.id, role)}>
            <i className="fas fa-trash-alt" />
          </button>
        </div>
      }
    </div>
  );
  const renderInstructors = (cohort) => {
    const modifyPermission = hasCohortPermission(cohort, ["ADMIN"]);
    
    return (
      <div>
        <h4 className={cx(c.projectSub)}>{lcs("instructors")} ({lcs("admins")})</h4>
        {cohort.mentors.map((member) => renderUser(cohort.id, member, "iadmin"))}
        { modifyPermission &&
          <Link
            to={`${url.substring(0, url.lastIndexOf('/'))}/${cohort.id}/add/iadmin`}
            className={cx(c.addMemberBtn)}
          >
            {lcs("add_instructor")}
          </Link>
        }

        <h4 className={cx(c.projectSub)}>{lcs("instructors")}</h4>
        {cohort.instructors.map((member) => renderUser(cohort.id, member, "instructor"))}
        { modifyPermission &&
          <Link
            to={`${url.substring(0, url.lastIndexOf('/'))}/${cohort.id}/add/instructor`}
            className={cx(c.addMemberBtn)}
          >
            {lcs("add_instructor")}
          </Link>
        }
      </div>
    );
  };
  const renderMembers = (project, modifyPermission) => {
    return (
      <>
        <div className='d-flex flex-column'>
          <h4 className={cx(c.projectSub)}>{lcs("members")}</h4>
          <div className='d-flex flex-column'>
            {!hasProjectPermission(project, ["C_ADMIN"], project.admin.id) && renderUser(project.id, project.admin, "admin")}
            {project.members.map((member) => renderUser(project.id, member, "member", modifyPermission))}
          </div>

          { modifyPermission &&
            <Link
              to={`${url.substring(0, url.lastIndexOf('/'))}/${project.id}/add/member`}
              className={cx(c.addMemberBtn)}
            >
              {lcs("add_member")}
            </Link>
          }
        </div>
        <div className='d-flex flex-column'>
          <h4 className={cx(c.projectSub)}>{lcs("mentors")}</h4>
          <div className='d-flex flex-column'>
            { project.mentors.length > 0 ?
              project.mentors.map((member) => renderUser(project.id, member, "mentor", modifyPermission)) :
              <p style={{textAlign: 'center'}}>No Mentors Added</p>
            }
          </div>
          { modifyPermission &&
            <Link
              to={`${url.substring(0, url.lastIndexOf('/'))}/${project.id}/add/mentor`}
              className={cx(c.addMemberBtn)}
            >
              {lcs("add_mentor")}
            </Link>
          }
        </div>
      </>
    );
  };

  if (!hasPermission) return <div />;

  const AddMemberModal = (props) => (
    <Modal match={props.match} width={470} height={300} history={props.history}>
      <AddMember />
    </Modal>
  );

  const BulkModal = (props) => (
    <Modal match={props.match} width={470} height={500} history={props.history}>
      <BulkLoad url={url} />
    </Modal>
  );

  return (
    <div className={cx(c.module)}>
      <div className={cx(c.upload, 'col-md-10')}>
        { cohort &&
          <>
            <h2 className={c.title}>{cohort.name}</h2>
            <div className={cx(c.projectsContainer, 'd-flex flex-column')}>
              <div className={cx(c.project)}>
                {renderInstructors(cohort)}
              </div>
            </div>
          </>
        }

        <h2 className={c.title}>{lcs("projects")}</h2>
        { addCondition &&
          <div className={c.options}>
            <Link className={cx(c.uploadButton)} to="/projects/new">
              {lcs("new_project")}
            </Link>

            {cohort != null &&
              <Link className={cx(c.bulkButton)} to={`${url}/bulk`}>
                {lcs("bulk_load")}
              </Link>
            }
            {/*cohort != null &&
              <Link className={cx(c.phasesButton)} to={`${url}/phases`}>
                {lcs("phases")}
              </Link>*/}
          </div>
        }

        <div className={cx(c.projectsContainer, 'd-flex flex-column')}>
          {projects.sort((a, b) => {
            const aBool = (hasProjectPermission(a, ["MEMBER"]) && a.cohort_id == null) || (hasProjectPermission(a, ["C_ADMIN"]) && a.cohort_id != null);
            const bBool = (hasProjectPermission(b, ["MEMBER"]) && b.cohort_id == null) || (hasProjectPermission(b, ["C_ADMIN"]) && b.cohort_id != null);
            return (aBool === bBool) ? 0 : aBool ? -1 : 1;
          }).map((project) => {
            const modifyPermission = (hasProjectPermission(project, ["MEMBER"]) && project.cohort_id == null) || (hasProjectPermission(project, ["C_ADMIN"]) && project.cohort_id != null);
            return (
              <div key={project.id} className={cx(c.project, c.project + "_" + project.id, 'd-flex flex-column')}>
                <div className='d-flex justify-content-between align-items-center'>
                  <h3 className={cx(c.projectName)}>{project.name}</h3>
                  {modifyPermission &&
                    <button className={cx(c.buttonOption)} title={project.id} onClick={openOptionMenu}>
                      <i className={cx("fas fa-ellipsis-v")} />
                    </button>
                  }
                </div>
                {renderMembers(project, modifyPermission)}
              </div>
            );
          })}
        </div>
      </div>

      <Menu
        anchorEl={optionMenu}
        open={Boolean(optionMenu)}
        onClose={closeOptionMenu}>
        <MenuItem onClick={onClickEditProject}>{lcs("edit")}</MenuItem>
        <MenuItem onClick={onClickDeleteProject}>{lcs("delete")}</MenuItem>
      </Menu>

      <Route path={`${path}/add/:member_type`} component={AddMemberModal} />
      <Route path={`${path}/bulk`} component={BulkModal} />
    </div>
  );
}

export default redux(ProjectAdmin);