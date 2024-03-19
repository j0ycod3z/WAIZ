import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import CohortDetails from "seed/examples/cohorts/Details";
import CohortList from "seed/examples/cohorts/List";
import CohortListOptions from "seed/examples/cohorts/options/ListOptions";
import CohortDetailsOptions from "seed/examples/cohorts/options/DetailsOptions";
import CohortForm from "seed/examples/cohorts/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/cohorts/Cohorts.module.css";

function Cohorts(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <CohortListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <CohortList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <CohortDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <CohortDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <CohortForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:cohort_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:cohort_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default Cohorts;