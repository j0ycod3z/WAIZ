import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import TrlDetails from "seed/examples/trls/Details";
import TrlList from "seed/examples/trls/List";
import TrlListOptions from "seed/examples/trls/options/ListOptions";
import TrlDetailsOptions from "seed/examples/trls/options/DetailsOptions";
import TrlForm from "seed/examples/trls/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/trls/Trls.module.css";

function Trls(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <TrlListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <TrlList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <TrlDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <TrlDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <TrlForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:trl_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:trl_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default Trls;