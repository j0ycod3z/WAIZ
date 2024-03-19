import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import AreaTagDetails from "seed/examples/area_tags/Details";
import AreaTagList from "seed/examples/area_tags/List";
import AreaTagListOptions from "seed/examples/area_tags/options/ListOptions";
import AreaTagDetailsOptions from "seed/examples/area_tags/options/DetailsOptions";
import AreaTagForm from "seed/examples/area_tags/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/area_tags/AreaTags.module.css";

function AreaTags(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <AreaTagListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <AreaTagList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <AreaTagDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <AreaTagDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <AreaTagForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:area_tag_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:area_tag_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default AreaTags;