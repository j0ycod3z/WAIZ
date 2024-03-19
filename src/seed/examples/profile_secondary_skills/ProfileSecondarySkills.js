import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import ProfileSecondarySkillDetails from "seed/examples/profile_secondary_skills/Details";
import ProfileSecondarySkillList from "seed/examples/profile_secondary_skills/List";
import ProfileSecondarySkillListOptions from "seed/examples/profile_secondary_skills/options/ListOptions";
import ProfileSecondarySkillDetailsOptions from "seed/examples/profile_secondary_skills/options/DetailsOptions";
import ProfileSecondarySkillForm from "seed/examples/profile_secondary_skills/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/profile_secondary_skills/ProfileSecondarySkills.module.css";

function ProfileSecondarySkills(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <ProfileSecondarySkillListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <ProfileSecondarySkillList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <ProfileSecondarySkillDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <ProfileSecondarySkillDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <ProfileSecondarySkillForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:profile_secondary_skill_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:profile_secondary_skill_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default ProfileSecondarySkills;