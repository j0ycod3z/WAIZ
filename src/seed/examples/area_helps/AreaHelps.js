import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import AreaHelpDetails from "seed/examples/area_helps/Details";
import AreaHelpList from "seed/examples/area_helps/List";
import AreaHelpListOptions from "seed/examples/area_helps/options/ListOptions";
import AreaHelpDetailsOptions from "seed/examples/area_helps/options/DetailsOptions";
import AreaHelpForm from "seed/examples/area_helps/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/area_helps/AreaHelps.module.css";

function AreaHelps(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <AreaHelpListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <AreaHelpList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <AreaHelpDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <AreaHelpDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <AreaHelpForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:area_help_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:area_help_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default AreaHelps;