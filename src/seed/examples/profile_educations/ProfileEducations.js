import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import ProfileEducationDetails from "seed/examples/profile_educations/Details";
import ProfileEducationList from "seed/examples/profile_educations/List";
import ProfileEducationListOptions from "seed/examples/profile_educations/options/ListOptions";
import ProfileEducationDetailsOptions from "seed/examples/profile_educations/options/DetailsOptions";
import ProfileEducationForm from "seed/examples/profile_educations/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/profile_educations/ProfileEducations.module.css";

function ProfileEducations(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <ProfileEducationListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <ProfileEducationList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <ProfileEducationDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <ProfileEducationDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <ProfileEducationForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:profile_education_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:profile_education_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default ProfileEducations;