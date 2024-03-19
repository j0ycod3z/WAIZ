import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import HypothesisDetails from "seed/examples/hypotheses/Details";
import HypothesisList from "seed/examples/hypotheses/List";
import HypothesisListOptions from "seed/examples/hypotheses/options/ListOptions";
import HypothesisDetailsOptions from "seed/examples/hypotheses/options/DetailsOptions";
import HypothesisForm from "seed/examples/hypotheses/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/hypotheses/Hypotheses.module.css";

function Hypotheses(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <HypothesisListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <HypothesisList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <HypothesisDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <HypothesisDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <HypothesisForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:hypothesis_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:hypothesis_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default Hypotheses;