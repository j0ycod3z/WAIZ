import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import CanvasTypeDetails from "seed/examples/canvas_types/Details";
import CanvasTypeList from "seed/examples/canvas_types/List";
import CanvasTypeListOptions from "seed/examples/canvas_types/options/ListOptions";
import CanvasTypeDetailsOptions from "seed/examples/canvas_types/options/DetailsOptions";
import CanvasTypeForm from "seed/examples/canvas_types/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/canvas_types/CanvasTypes.module.css";

function CanvasTypes(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <CanvasTypeListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <CanvasTypeList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <CanvasTypeDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <CanvasTypeDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <CanvasTypeForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:canvas_type_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:canvas_type_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default CanvasTypes;