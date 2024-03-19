import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import KbProgressDetails from "seed/examples/kb_progresses/Details";
import KbProgressList from "seed/examples/kb_progresses/List";
import KbProgressListOptions from "seed/examples/kb_progresses/options/ListOptions";
import KbProgressDetailsOptions from "seed/examples/kb_progresses/options/DetailsOptions";
import KbProgressForm from "seed/examples/kb_progresses/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/kb_progresses/KbProgresses.module.css";

function KbProgresses(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <KbProgressListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <KbProgressList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <KbProgressDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <KbProgressDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <KbProgressForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:kb_progress_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:kb_progress_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default KbProgresses;