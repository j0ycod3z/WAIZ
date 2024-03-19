import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import TranslationDetails from "seed/examples/translations/Details";
import TranslationList from "seed/examples/translations/List";
import TranslationListOptions from "seed/examples/translations/options/ListOptions";
import TranslationDetailsOptions from "seed/examples/translations/options/DetailsOptions";
import TranslationForm from "seed/examples/translations/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/translations/Translations.module.css";

function Translations(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <TranslationListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <TranslationList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <TranslationDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <TranslationDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <TranslationForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:translation_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:translation_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default Translations;