import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import DeepAnswerDetails from "seed/examples/deep_answers/Details";
import DeepAnswerList from "seed/examples/deep_answers/List";
import DeepAnswerListOptions from "seed/examples/deep_answers/options/ListOptions";
import DeepAnswerDetailsOptions from "seed/examples/deep_answers/options/DetailsOptions";
import DeepAnswerForm from "seed/examples/deep_answers/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/deep_answers/DeepAnswers.module.css";

function DeepAnswers(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <DeepAnswerListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <DeepAnswerList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <DeepAnswerDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <DeepAnswerDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <DeepAnswerForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:deep_answer_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:deep_answer_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default DeepAnswers;