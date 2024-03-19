import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import KbItemDetails from "seed/examples/kb_items/Details";
import KbItemList from "seed/examples/kb_items/List";
import KbItemListOptions from "seed/examples/kb_items/options/ListOptions";
import KbItemDetailsOptions from "seed/examples/kb_items/options/DetailsOptions";
import KbItemForm from "seed/examples/kb_items/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/kb_items/KbItems.module.css";

function KbItems(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <KbItemListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <KbItemList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <KbItemDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <KbItemDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <KbItemForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:kb_item_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:kb_item_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default KbItems;