import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import InterviewDetails from "seed/examples/interviews/Details";
import InterviewList from "seed/examples/interviews/List";
import InterviewListOptions from "seed/examples/interviews/options/ListOptions";
import InterviewDetailsOptions from "seed/examples/interviews/options/DetailsOptions";
import InterviewForm from "seed/examples/interviews/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/interviews/Interviews.module.css";

function Interviews(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <InterviewListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <InterviewList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <InterviewDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <InterviewDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <InterviewForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:interview_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:interview_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default Interviews;