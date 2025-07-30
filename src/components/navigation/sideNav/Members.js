import * as React from 'react';
import redux from 'seed/redux';

import { Link } from 'react-router-dom'
import { lcs } from 'components/util/Locales'

import Caption from 'components/helpers/Caption';

import c from "resources/css/navigation/sideNav/Members.module.css";

class Members extends React.Component
{
  render()
  {
    const { url } = this.props.match;
    const { project } = this.props;
    let members = [];
    let mentors = [];

    let memberAdmin = false;
    if (project.cohort_id == null) {
      members.push(this.renderUser(project.admin, 'admin'));
      memberAdmin = true;
    }
    for (let i = 0; i < 4 + (!memberAdmin ? 1 : 0); i++)
      if (i < project.members.length)
        members.push(this.renderUser(project.members[i], `member-${i}`));
      else members.push(this.renderUser(null, `empty-member-${i}`))

    if (project.members.length > 4 + (!memberAdmin ? 1 : 0))
      members.push(
        this.renderMore(project.members.length - (4 + (!memberAdmin ? 1 : 0)), 'more-members'))

    for (let i = 0; i < 5; i++)
      if (i < project.mentors.length)
        mentors.push(this.renderUser(project.mentors[i], `mentor-${i}`));
      else mentors.push(this.renderUser(null, `empty-mentor-${i}`))

    if (project.mentors.length > 5)
      mentors.push(
        this.renderMore(project.mentors.length - 5, 'more-mentors'))


    return (
      <div className={c.module}>

        {/* Team */}

        <div className={c.footer} >
          {/* Members */}

          <div className={c.element} >
            <div className={c.sectionTitle}>{lcs("members")}
            </div>

            <div className={c.team}>
              <div className={c.teamSection}>
                {members}
              </div>
              <div className={c.teamSection}>
                <Link to={`${url}/project_admin/${project.id}/add/member`} className={c.buttonAdd}>
                  <i className={c.buttonAddIcon + " fas fa-plus-circle"} />
                </Link>
              </div>
            </div>
          </div >

          {/* Mentors */}

          <div className={c.element} >
            <div className={c.sectionTitle}>{lcs("mentors")}
            </div>

            <div className={c.team}>
              <div className={c.teamSection}>
                {mentors}
              </div>
              <div className={c.teamSection}>
                <Link to={`${url}/project_admin/${project.id}/add/mentor`} className={c.buttonAdd}>
                  <i className={c.buttonAddIcon + " fas fa-plus-circle"} />
                </Link>
              </div>
            </div>
          </div >
        </div>
      </div>
    );
  }

  renderUser(user, key)
  {
    if (user)
      return (
        <Caption key={key} text={user.first_name + " " + user.last_name}>
          <div className={c.teamElement}>
            <Link to={`/app/profile/${user.id}`}>
              <img
                className={c.teamImage}
                src={user.image_url}
                alt="teamMember" />
            </Link>
          </div>
        </Caption >)
    return (
      <div key={key} className={c.teamElementDefault}>
      </div>
    )
  }

  renderMore(num, key)
  {
    const { project } = this.props;
    return (
      <Link key={key} to={`/app/project_profile/${project.id}`}>
        <div className={c.teamElementMore}>
          {"+" + num}
        </div>
      </Link>
    )
  }
}

export default redux(Members);
