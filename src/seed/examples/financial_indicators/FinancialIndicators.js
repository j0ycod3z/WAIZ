import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import FinancialIndicatorDetails from "seed/examples/financial_indicators/Details";
import FinancialIndicatorList from "seed/examples/financial_indicators/List";
import FinancialIndicatorListOptions from "seed/examples/financial_indicators/options/ListOptions";
import FinancialIndicatorDetailsOptions from "seed/examples/financial_indicators/options/DetailsOptions";
import FinancialIndicatorForm from "seed/examples/financial_indicators/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/financial_indicators/FinancialIndicators.module.css";

function FinancialIndicators(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <FinancialIndicatorListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <FinancialIndicatorList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <FinancialIndicatorDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <FinancialIndicatorDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <FinancialIndicatorForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:financial_indicator_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:financial_indicator_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default FinancialIndicators;