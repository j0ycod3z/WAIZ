import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import FrontierStatusDetails from "seed/examples/frontier_statuses/Details";
import FrontierStatusList from "seed/examples/frontier_statuses/List";
import FrontierStatusListOptions from "seed/examples/frontier_statuses/options/ListOptions";
import FrontierStatusDetailsOptions from "seed/examples/frontier_statuses/options/DetailsOptions";
import FrontierStatusForm from "seed/examples/frontier_statuses/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/frontier_statuses/FrontierStatuses.module.css";

function FrontierStatuses(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <FrontierStatusListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <FrontierStatusList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <FrontierStatusDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <FrontierStatusDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <FrontierStatusForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:frontier_status_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:frontier_status_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default FrontierStatuses;