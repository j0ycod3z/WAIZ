import React from "react";
import cx from "classnames";
import { Link } from "react-router-dom";
import styles from "resources/css/seed/examples/profile_primary_skills/options/ListOptions.module.css";

function ProfilePrimarySkillListOptions(props) {
  const { url } = props.match;
  return (
    <div className={styles.module}>
      <div className={styles.options}>
        <Link to={`${url}/new`}
          className={cx(styles.btn, styles.create)}>Create</Link>
      </div>
    </div>
  );
}

export default ProfilePrimarySkillListOptions;