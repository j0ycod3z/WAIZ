import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import DeepQuestionDetails from "seed/examples/deep_questions/Details";
import DeepQuestionList from "seed/examples/deep_questions/List";
import DeepQuestionListOptions from "seed/examples/deep_questions/options/ListOptions";
import DeepQuestionDetailsOptions from "seed/examples/deep_questions/options/DetailsOptions";
import DeepQuestionForm from "seed/examples/deep_questions/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/deep_questions/DeepQuestions.module.css";

function DeepQuestions(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <DeepQuestionListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <DeepQuestionList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <DeepQuestionDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <DeepQuestionDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <DeepQuestionForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:deep_question_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:deep_question_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default DeepQuestions;