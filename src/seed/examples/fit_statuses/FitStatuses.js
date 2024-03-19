import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import FitStatusDetails from "seed/examples/fit_statuses/Details";
import FitStatusList from "seed/examples/fit_statuses/List";
import FitStatusListOptions from "seed/examples/fit_statuses/options/ListOptions";
import FitStatusDetailsOptions from "seed/examples/fit_statuses/options/DetailsOptions";
import FitStatusForm from "seed/examples/fit_statuses/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/fit_statuses/FitStatuses.module.css";

function FitStatuses(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <FitStatusListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <FitStatusList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <FitStatusDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <FitStatusDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <FitStatusForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:fit_status_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:fit_status_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default FitStatuses;