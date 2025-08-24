import React from 'react';
import redux from 'seed/redux';

import { Link } from 'react-router-dom'
import { lcs } from 'components/util/Locales'

import Caption from 'components/helpers/Caption';
import cx from 'classnames';

import c from "resources/css/navigation/sideNav/Members.module.css";

function Members(props) {
  const { project, match } = props;
  const { url } = match;
  let members = [];
  let mentors = [];
  
  function renderUser(user, key) {
    if (user)
      return (
        <Caption key={key} text={`${user.first_name} ${user.last_name}`}>
          <div className={c.teamElement}>
            <Link to={`/app/profile/${user.id}`}>
              <img
                className={c.teamImage}
                src={user.image_url}
                alt="teamMember" />
            </Link>
          </div>
        </Caption >)
    return <div key={key} className={c.teamElementDefault} />
  }

  function renderMore(num, key) {
    const { project } = this.props;
    return (
      <Link key={key} to={`/app/project_profile/${project.id}`}>
        <div className={c.teamElementMore}>
          {`+${num}`}
        </div>
      </Link>
    )
  }

  let count = 5;
  if (project.cohort_id === null || project.cohort_id === undefined) {
    members.push(renderUser(project.admin, 'admin'));
    count = 5;
  }

  for (let i = 0; i < count; i++)
    if (i < project.members.length)
      members.push(renderUser(project.members[i], `member-${i}`));
    else
      members.push(renderUser(null, `empty-member-${i}`));
  
  if (project.members.length > count)
    members.push(renderMore(project.members.length - count, 'more-members'));
  
  for (let i = 0; i < 5; i++)
    if (i < project.mentors.length)
      mentors.push(renderUser(project.mentors[i], `mentor-${i}`));
    else
      mentors.push(renderUser(null, `empty-mentor-${i}`));
  
  if (project.mentors.length > 5)
    mentors.push(renderMore(project.mentors.length - 5, 'more-mentors'));

  return (
    <div className={c.module}>
      <div className={c.element}>
        <div className={c.sectionTitle}>{lcs("members")}</div>
        <div className={c.team}>
          <div className={c.teamSection}>{members}</div>
          <div className={c.teamSection}>
            <Link to={`${url}/project_admin/${project.id}/add/member`} className={c.buttonAdd}>
              <i className={cx(c.buttonAddIcon, "fas fa-plus-circle")} />
            </Link>
          </div>
        </div>
      </div>
      <div className={c.element}>
        <div className={c.sectionTitle}>{lcs("mentors")}</div>
        <div className={c.team}>
          <div className={c.teamSection}>{mentors}</div>
          <div className={c.teamSection}>
            <Link to={`${url}/project_admin/${project.id}/add/mentor`} className={c.buttonAdd}>
              <i className={c.buttonAddIcon + " fas fa-plus-circle"} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default redux(Members);
