import React from 'react';
import cx from 'classnames';
import { lcs } from 'components/util/Locales';
import { Link } from 'react-router-dom'

import c from 'components/projects/Profile.module.scss';
import c2 from 'components/projects/Members.module.scss';

function Members(props) {
  const { project } = props;

  const renderUser = (user, i) => (
    <div key={i} className={cx(c2.member)}>
      <img className={cx(c2.profilePic)} src={user.image_url} alt="user" />
      <div className={cx(c2.memberInfo)}>
        <Link to={`/app/profile/${user.id}`}>
          <b className={cx(c2.name)}>{`${user.first_name} ${user.last_name}`}</b>
          <p className={cx(c2.mail)}>{user.email}</p>
        </Link>
      </div>
    </div>
  );

  return (
    <div className={cx(c.card)}>
      <div className={cx('card-body')}>
        <h5 className={cx('card-title', c.cardTitle)}>{lcs('members')}</h5>
        <div className={c2.project}>
          {project.cohort_id === null && renderUser(project.admin, 'admin')}
          {project.members.map((member, i) => renderUser(member, i))}
        </div>
      </div>
    </div>
  );  
}

export default Members;