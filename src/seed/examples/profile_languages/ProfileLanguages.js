import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import ProfileLanguageDetails from "seed/examples/profile_languages/Details";
import ProfileLanguageList from "seed/examples/profile_languages/List";
import ProfileLanguageListOptions from "seed/examples/profile_languages/options/ListOptions";
import ProfileLanguageDetailsOptions from "seed/examples/profile_languages/options/DetailsOptions";
import ProfileLanguageForm from "seed/examples/profile_languages/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/profile_languages/ProfileLanguages.module.css";

function ProfileLanguages(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <ProfileLanguageListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <ProfileLanguageList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <ProfileLanguageDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <ProfileLanguageDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <ProfileLanguageForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:profile_language_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:profile_language_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default ProfileLanguages;