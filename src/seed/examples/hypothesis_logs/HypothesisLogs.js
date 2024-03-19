import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import HypothesisLogDetails from "seed/examples/hypothesis_logs/Details";
import HypothesisLogList from "seed/examples/hypothesis_logs/List";
import HypothesisLogListOptions from "seed/examples/hypothesis_logs/options/ListOptions";
import HypothesisLogDetailsOptions from "seed/examples/hypothesis_logs/options/DetailsOptions";
import HypothesisLogForm from "seed/examples/hypothesis_logs/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/hypothesis_logs/HypothesisLogs.module.css";

function HypothesisLogs(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <HypothesisLogListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <HypothesisLogList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <HypothesisLogDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <HypothesisLogDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <HypothesisLogForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:hypothesis_log_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:hypothesis_log_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default HypothesisLogs;