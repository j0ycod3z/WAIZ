import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import FrontierDetails from "seed/examples/frontiers/Details";
import FrontierList from "seed/examples/frontiers/List";
import FrontierListOptions from "seed/examples/frontiers/options/ListOptions";
import FrontierDetailsOptions from "seed/examples/frontiers/options/DetailsOptions";
import FrontierForm from "seed/examples/frontiers/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/frontiers/Frontiers.module.css";

function Frontiers(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <FrontierListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <FrontierList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <FrontierDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <FrontierDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <FrontierForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:frontier_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:frontier_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default Frontiers;