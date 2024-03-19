import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import KbFileDetails from "seed/examples/kb_files/Details";
import KbFileList from "seed/examples/kb_files/List";
import KbFileListOptions from "seed/examples/kb_files/options/ListOptions";
import KbFileDetailsOptions from "seed/examples/kb_files/options/DetailsOptions";
import KbFileForm from "seed/examples/kb_files/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/kb_files/KbFiles.module.css";

function KbFiles(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <KbFileListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <KbFileList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <KbFileDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <KbFileDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <KbFileForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:kb_file_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:kb_file_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default KbFiles;