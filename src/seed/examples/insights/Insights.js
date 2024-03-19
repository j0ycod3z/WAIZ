import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import InsightDetails from "seed/examples/insights/Details";
import InsightList from "seed/examples/insights/List";
import InsightListOptions from "seed/examples/insights/options/ListOptions";
import InsightDetailsOptions from "seed/examples/insights/options/DetailsOptions";
import InsightForm from "seed/examples/insights/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/insights/Insights.module.css";

function Insights(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <InsightListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <InsightList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <InsightDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <InsightDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <InsightForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:insight_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:insight_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default Insights;