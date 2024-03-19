import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import TrlQuestionDetails from "seed/examples/trl_questions/Details";
import TrlQuestionList from "seed/examples/trl_questions/List";
import TrlQuestionListOptions from "seed/examples/trl_questions/options/ListOptions";
import TrlQuestionDetailsOptions from "seed/examples/trl_questions/options/DetailsOptions";
import TrlQuestionForm from "seed/examples/trl_questions/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/trl_questions/TrlQuestions.module.css";

function TrlQuestions(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <TrlQuestionListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <TrlQuestionList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <TrlQuestionDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <TrlQuestionDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <TrlQuestionForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:trl_question_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:trl_question_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default TrlQuestions;