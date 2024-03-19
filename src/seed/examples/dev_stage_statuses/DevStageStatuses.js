import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import DevStageStatusDetails from "seed/examples/dev_stage_statuses/Details";
import DevStageStatusList from "seed/examples/dev_stage_statuses/List";
import DevStageStatusListOptions from "seed/examples/dev_stage_statuses/options/ListOptions";
import DevStageStatusDetailsOptions from "seed/examples/dev_stage_statuses/options/DetailsOptions";
import DevStageStatusForm from "seed/examples/dev_stage_statuses/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/dev_stage_statuses/DevStageStatuses.module.css";

function DevStageStatuses(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <DevStageStatusListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <DevStageStatusList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <DevStageStatusDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <DevStageStatusDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <DevStageStatusForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:dev_stage_status_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:dev_stage_status_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default DevStageStatuses;