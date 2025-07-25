import React, { Component } from 'react';
import cx from 'classnames';
import { lcs } from 'components/util/Locales';
import { Link } from 'react-router-dom'
import { hasProjectPermission } from 'components/util/Permissions';

import 'react-bootstrap';
import styles from 'resources/css/projects/Profile.module.css';
import c from 'resources/css/projects/Members.module.css';

class Export extends Component
{
  render()
  {
    const { project } = this.props;

    return (
      <div className={cx("card", styles.card)}>
        <div className={cx("card-body")}>
          <h5 className={cx("card-title")}>{lcs("members")}</h5>

          <div className={c.project}>
            {project.cohort_id == null ?
              this.renderUser(project.admin) : null}
            {project.members.map(member => this.renderUser(member))}
          </div>
        </div>
      </div>
    );
  }

  renderUser(user)
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
      </div>
    );
  }
}

export default Export;