import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import AreaDetails from "seed/examples/areas/Details";
import AreaList from "seed/examples/areas/List";
import AreaListOptions from "seed/examples/areas/options/ListOptions";
import AreaDetailsOptions from "seed/examples/areas/options/DetailsOptions";
import AreaForm from "seed/examples/areas/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/areas/Areas.module.css";

function Areas(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <AreaListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <AreaList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <AreaDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <AreaDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <AreaForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:area_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:area_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default Areas;