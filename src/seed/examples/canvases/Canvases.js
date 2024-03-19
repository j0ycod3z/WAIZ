import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import CanvasDetails from "seed/examples/canvases/Details";
import CanvasList from "seed/examples/canvases/List";
import CanvasListOptions from "seed/examples/canvases/options/ListOptions";
import CanvasDetailsOptions from "seed/examples/canvases/options/DetailsOptions";
import CanvasForm from "seed/examples/canvases/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/canvases/Canvases.module.css";

function Canvases(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <CanvasListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <CanvasList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <CanvasDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <CanvasDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <CanvasForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:canvas_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:canvas_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default Canvases;