import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import ProfileDetails from "seed/examples/profiles/Details";
import ProfileList from "seed/examples/profiles/List";
import ProfileListOptions from "seed/examples/profiles/options/ListOptions";
import ProfileDetailsOptions from "seed/examples/profiles/options/DetailsOptions";
import ProfileForm from "seed/examples/profiles/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/profiles/Profiles.module.css";

function Profiles(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <ProfileListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <ProfileList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <ProfileDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <ProfileDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <ProfileForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:profile_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:profile_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default Profiles;