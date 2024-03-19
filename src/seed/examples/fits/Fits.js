import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import FitDetails from "seed/examples/fits/Details";
import FitList from "seed/examples/fits/List";
import FitListOptions from "seed/examples/fits/options/ListOptions";
import FitDetailsOptions from "seed/examples/fits/options/DetailsOptions";
import FitForm from "seed/examples/fits/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/fits/Fits.module.css";

function Fits(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <FitListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <FitList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <FitDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <FitDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <FitForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:fit_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:fit_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default Fits;