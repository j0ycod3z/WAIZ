import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import DevStageDetails from "seed/examples/dev_stages/Details";
import DevStageList from "seed/examples/dev_stages/List";
import DevStageListOptions from "seed/examples/dev_stages/options/ListOptions";
import DevStageDetailsOptions from "seed/examples/dev_stages/options/DetailsOptions";
import DevStageForm from "seed/examples/dev_stages/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/dev_stages/DevStages.module.css";

function DevStages(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <DevStageListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <DevStageList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <DevStageDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <DevStageDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <DevStageForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:dev_stage_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:dev_stage_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default DevStages;