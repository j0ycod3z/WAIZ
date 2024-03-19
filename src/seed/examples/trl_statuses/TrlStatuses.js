import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import TrlStatusDetails from "seed/examples/trl_statuses/Details";
import TrlStatusList from "seed/examples/trl_statuses/List";
import TrlStatusListOptions from "seed/examples/trl_statuses/options/ListOptions";
import TrlStatusDetailsOptions from "seed/examples/trl_statuses/options/DetailsOptions";
import TrlStatusForm from "seed/examples/trl_statuses/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/trl_statuses/TrlStatuses.module.css";

function TrlStatuses(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <TrlStatusListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <TrlStatusList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <TrlStatusDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <TrlStatusDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <TrlStatusForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:trl_status_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:trl_status_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default TrlStatuses;