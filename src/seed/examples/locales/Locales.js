import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import LocaleDetails from "seed/examples/locales/Details";
import LocaleList from "seed/examples/locales/List";
import LocaleListOptions from "seed/examples/locales/options/ListOptions";
import LocaleDetailsOptions from "seed/examples/locales/options/DetailsOptions";
import LocaleForm from "seed/examples/locales/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/locales/Locales.module.css";

function Locales(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <LocaleListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <LocaleList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <LocaleDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <LocaleDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <LocaleForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:locale_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:locale_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default Locales;