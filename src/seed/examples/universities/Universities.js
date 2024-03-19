import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import UniversityDetails from "seed/examples/universities/Details";
import UniversityList from "seed/examples/universities/List";
import UniversityListOptions from "seed/examples/universities/options/ListOptions";
import UniversityDetailsOptions from "seed/examples/universities/options/DetailsOptions";
import UniversityForm from "seed/examples/universities/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/universities/Universities.module.css";

function Universities(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <UniversityListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <UniversityList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <UniversityDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <UniversityDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <UniversityForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:university_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:university_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default Universities;