import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import KbSectionDetails from "seed/examples/kb_sections/Details";
import KbSectionList from "seed/examples/kb_sections/List";
import KbSectionListOptions from "seed/examples/kb_sections/options/ListOptions";
import KbSectionDetailsOptions from "seed/examples/kb_sections/options/DetailsOptions";
import KbSectionForm from "seed/examples/kb_sections/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/kb_sections/KbSections.module.css";

function KbSections(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <KbSectionListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <KbSectionList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <KbSectionDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <KbSectionDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <KbSectionForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:kb_section_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:kb_section_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default KbSections;