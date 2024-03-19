import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import KbCourseDetails from "seed/examples/kb_courses/Details";
import KbCourseList from "seed/examples/kb_courses/List";
import KbCourseListOptions from "seed/examples/kb_courses/options/ListOptions";
import KbCourseDetailsOptions from "seed/examples/kb_courses/options/DetailsOptions";
import KbCourseForm from "seed/examples/kb_courses/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/kb_courses/KbCourses.module.css";

function KbCourses(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <KbCourseListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <KbCourseList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <KbCourseDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <KbCourseDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <KbCourseForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:kb_course_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:kb_course_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default KbCourses;