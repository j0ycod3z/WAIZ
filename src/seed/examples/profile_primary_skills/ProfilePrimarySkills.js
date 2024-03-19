import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import ProfilePrimarySkillDetails from "seed/examples/profile_primary_skills/Details";
import ProfilePrimarySkillList from "seed/examples/profile_primary_skills/List";
import ProfilePrimarySkillListOptions from "seed/examples/profile_primary_skills/options/ListOptions";
import ProfilePrimarySkillDetailsOptions from "seed/examples/profile_primary_skills/options/DetailsOptions";
import ProfilePrimarySkillForm from "seed/examples/profile_primary_skills/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/profile_primary_skills/ProfilePrimarySkills.module.css";

function ProfilePrimarySkills(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <ProfilePrimarySkillListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <ProfilePrimarySkillList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <ProfilePrimarySkillDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <ProfilePrimarySkillDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <ProfilePrimarySkillForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:profile_primary_skill_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:profile_primary_skill_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default ProfilePrimarySkills;