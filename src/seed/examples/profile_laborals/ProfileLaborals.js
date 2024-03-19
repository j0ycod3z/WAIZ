import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import ProfileLaboralDetails from "seed/examples/profile_laborals/Details";
import ProfileLaboralList from "seed/examples/profile_laborals/List";
import ProfileLaboralListOptions from "seed/examples/profile_laborals/options/ListOptions";
import ProfileLaboralDetailsOptions from "seed/examples/profile_laborals/options/DetailsOptions";
import ProfileLaboralForm from "seed/examples/profile_laborals/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/profile_laborals/ProfileLaborals.module.css";

function ProfileLaborals(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <ProfileLaboralListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <ProfileLaboralList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <ProfileLaboralDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <ProfileLaboralDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <ProfileLaboralForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:profile_laboral_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:profile_laboral_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default ProfileLaborals;