import * as React from 'react';
import redux from 'seed/redux';
import cx from 'classnames';
import * as Util from 'seed/util'
import { Route, Link } from 'react-router-dom'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from 'seed/components/helpers/Modal';
import AddMember from 'components/project_admin/AddMember';
import BulkLoad from 'components/project_admin/Bulk';

import { hasProjectPermission, hasCohortPermission } from 'components/util/Permissions';

import c from 'resources/css/project_admin/Admin.module.css';
import { lcs } from 'components/util/Locales';

class ProjectAdmin extends React.Component
{
  render()
  {
    const { url, path } = this.props.match;
    const userId = parseInt(sessionStorage.getItem('id'));
    const { optionMenu } = this.state;
    const cohortId = localStorage.getItem('cohortId') != 0 ? localStorage.getItem('cohortId') : null

    let projects = this.props.projects.filter(p =>
      p != null && ((p.admin_id == userId || p.mentor_ids.includes(userId) || p.member_ids.includes(userId) ||
        (p.cohort != null && (p.cohort.admin_id == userId) || p.cohort.mentor_ids.includes(userId) || p.cohort.instructor_ids.includes(userId)))
      ) && p.cohort_id == cohortId)
      .sort((p1, p2) => p1.name.localeCompare(p2.name));

    let cohort = this.props.cohorts.filter(ch => ch.id == cohortId)[0]
    const addCondition = (cohortId != null && cohortId > 0) ||
      ((cohortId == 0 || cohortId == null) && projects.length < 3)

    const hasPermission = (cohort != null && hasCohortPermission(cohort, ["ADMIN"])) ||
      (projects.length > 0 && projects[0].cohort == null && hasProjectPermission(projects[0], ["MEMBER", "MENTOR"]))

    if (!hasPermission) return <div />

    const AddMemberModal = props =>
      <Modal
        match={props.match}
        width={470}
        height={500}
        history={props.history}>
        <AddMember />
      </Modal>

    const BulkModal = props =>
      <Modal
        match={props.match}
        width={470}
        height={500}
        history={props.history}>
        <BulkLoad url={url} />
      </Modal>

    return (
      <div className={cx(c.module)}>
        <div className={cx(c.upload)}>

          {cohort ?
            <div>
              <div className={c.title} >
                {cohort.name}
              </div>
              <div className={c.projectsContainer}
                style={{ marginTop: "50px" }}>
                {
                  <div className={cx(c.project)}>
                    {this.renderInstructors(cohort)}
                  </div>
                }
              </div>
            </div> : null
          }

          <div className={c.title}>
            {lcs("projects")}
          </div>

          <div className={c.options}>
            <Link className={cx(c.uploadButton)} to="/projects/new"
              style={{ visibility: addCondition ? "visible" : "hidden" }}>
              {lcs("new_project")}
            </Link>
            {cohort != null ?
              <Link className={cx(c.bulkButton)} to={`${url}/bulk`}
                style={{ visibility: addCondition ? "visible" : "hidden" }}>
                {lcs("bulk_load")}
              </Link> : null}
            {/*cohort != null ?
              <Link className={cx(c.phasesButton)} to={`${url}/phases`}
                style={{ visibility: addCondition ? "visible" : "hidden" }}>
                {lcs("phases")}
            </Link> : null*/}
          </div>

          <div className={c.projectsContainer}>
            {
              projects.map(project => (
                <div className={cx(c.project, c.project + "_" + project.id)}>
                  <h2 className={cx(c.projectName)}>{project.name}</h2>
                  {(hasProjectPermission(project, ["MEMBER"]) && project.cohort_id == null ||
                    hasProjectPermission(project, ["C_ADMIN"]) && project.cohort_id != null) ?
                    <i className={c.buttonOption + "  fas fa-ellipsis-v"}
                      title={project.id}
                      onClick={this.openOptionMenu} /> : null}
                  {this.renderMembers(project)}
                </div>))
            }
          </div>
        </div>

        <Menu
          anchorEl={optionMenu}
          open={Boolean(optionMenu)}
          onClose={this.closeOptionMenu}>
          <MenuItem onClick={this.onClickEditProject}>{lcs("edit")}</MenuItem>
          <MenuItem onClick={this.onClickDeleteProject}>{lcs("delete")}</MenuItem>
        </Menu>

        <Route path={`${path}/add/:member_type`}
          component={AddMemberModal} />
        <Route path={`${path}/bulk`}
          component={BulkModal} />
      </div >
    )
  }

  renderInstructors(cohort)
  {
    const { url } = this.props.match;
    const modifyPermission = hasCohortPermission(cohort, ["ADMIN"])
    return (
      <div>
        <h4 className={cx(c.projectSub)}>{lcs("instructors")} ({lcs("admins")})</h4>
        {cohort.mentors.map(member => this.renderUser(cohort.id, member, "iadmin"))}
        <Link to={`${url.substring(0, url.lastIndexOf('/'))}/${cohort.id}/add/iadmin`}
          className={cx(c.addMemberBtn)}
          style={{ visibility: modifyPermission ? "visible" : "hidden" }}
        >{lcs("add_instructor")}</Link>

        <h4 className={cx(c.projectSub)}>{lcs("instructors")}</h4>
        {cohort.instructors.map(member => this.renderUser(cohort.id, member, "instructor"))}
        <Link to={`${url.substring(0, url.lastIndexOf('/'))}/${cohort.id}/add/instructor`}
          className={cx(c.addMemberBtn)}
          style={{ visibility: modifyPermission ? "visible" : "hidden" }}
        >{lcs("add_instructor")}</Link>
      </div>
    )
  }

  renderMembers(project)
  {
    const { url } = this.props.match;
    const modifyPermission = (hasProjectPermission(project, ["MEMBER"]) && project.cohort_id == null ||
      hasProjectPermission(project, ["C_ADMIN"]) && project.cohort_id != null)
    return (
      <div>
        <h4 className={cx(c.projectSub)}>{lcs("members")}</h4>
        {!hasProjectPermission(project, ["C_ADMIN"], project.admin.id) ?
          this.renderUser(project.id, project.admin, "admin") : null}

        {project.members.map(member => this.renderUser(project.id, member, "member"))}

        <Link to={`${url.substring(0, url.lastIndexOf('/'))}/${project.id}/add/member`}
          className={cx(c.addMemberBtn)}
          style={{ visibility: modifyPermission ? "visible" : "hidden" }}
        >{lcs("add_member")}</Link>
        <h4 className={cx(c.projectSub)}
          style={{ marginTop: "14px" }}>{lcs("mentors")}</h4>
        {project.mentors.map(member => this.renderUser(project.id, member, "mentor"))}
        <Link to={`${url.substring(0, url.lastIndexOf('/'))}/${project.id}/add/mentor`}
          className={cx(c.addMemberBtn)}
          style={{ visibility: modifyPermission ? "visible" : "hidden" }}
        >{lcs("add_mentor")}</Link>
      </div>
    )
  }

  renderUser(projectId, user, rol)
  {
    return (
      <div className={cx(c.member)}>
        <label
          className={cx(c.profilePic)}
          style={{ backgroundImage: `url("${user.image_url}")` }}
          alt="profileImage" />
        <div className={cx(c.memberInfo)}>
          <Link to={`/app/profile/${user.id}`}>
            <p className={cx(c.name)}>{user.first_name} {user.last_name}</p>
            <p className={cx(c.mail)}>{user.email}</p>
          </Link>
        </div>
        {rol != "admin" ?
          <div className={c.deleteButton} >
            <button onClick={() => this.onClickDelete(projectId, user.id, rol)}>
              <i class="fas fa-trash-alt"></i>
            </button></div> : null
        }
      </div>
    );
  }

  constructor(props)
  {
    super(props);
    this.state = {
      optionMenu: null
    };
    this.openOptionMenu = this.openOptionMenu.bind(this);
    this.closeOptionMenu = this.closeOptionMenu.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickEditProject = this.onClickEditProject.bind(this);
    this.onClickDeleteProject = this.onClickDeleteProject.bind(this);
  }

  componentDidMount()
  {
    const userId = sessionStorage.getItem('id');
    const cohortId = localStorage.getItem('cohortId') != 0 ? localStorage.getItem('cohortId') : 0
    this.props.getUserProjectList(userId, cohortId);
    this.props.getUserCohortList(userId);
  }

  onClickDelete(id, userId, rol)
  {
    let res = []
    if (rol == "member") {
      const project = Util.get(this.props.projects, id);
      res = project.member_ids
    }
    if (rol == "mentor") {
      const project = Util.get(this.props.projects, id);
      res = project.mentor_ids;
    }
    if (rol == "instructor") {
      const cohort = Util.get(this.props.cohorts, id);
      res = cohort.instructor_ids;
    }
    if (rol == "iadmin") {
      const cohort = Util.get(this.props.cohorts, id);
      res = cohort.mentor_ids;
    }

    alert(res + " " + userId);

    for (var i = 0; i < res.length; i++)
      if (res[i] === userId)
        res.splice(i, 1);

    if (rol == "member")
      this.props.setProject(id, {
        "member_ids": res
      })
    if (rol == "mentor")
      this.props.setProject(id, {
        "mentor_ids": res
      })
    if (rol == "instructor")
      this.props.setCohort(id, {
        "instructor_ids": res
      })
    if (rol == "iadmin")
      this.props.setCohort(id, {
        "mentor_ids": res
      })
  }

  openOptionMenu(e)
  {
    this.setState({ optionMenu: e.currentTarget });
  }

  closeOptionMenu(e)
  {
    this.setState({ optionMenu: null });
  }

  onClickEditProject()
  {
    const projectId = parseInt(this.state.optionMenu.title);
    let project = this.props.projects.filter(p => p.id == projectId)[0];
    let projectName = window.prompt(lcs("project_name"), project.name);
    if (projectName != null)
      this.props.setProject(projectId, {
        "name": projectName
      });
    this.setState({ optionMenu: null });
  }

  onClickDeleteProject()
  {
    const projectId = parseInt(this.state.optionMenu.title);
    const currentProjectId = parseInt(localStorage.getItem('projectId'));
    this.props.deleteProject(projectId);
    if (currentProjectId == projectId) {
      localStorage.setItem('projectId', null);
      localStorage.setItem('cohortId', null);
      window.location.href = "";
    }
    this.setState({ optionMenu: null });
  }
}

export default redux(ProjectAdmin);