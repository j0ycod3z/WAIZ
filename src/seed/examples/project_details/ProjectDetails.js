import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import ProjectDetailDetails from "seed/examples/project_details/Details";
import ProjectDetailList from "seed/examples/project_details/List";
import ProjectDetailListOptions from "seed/examples/project_details/options/ListOptions";
import ProjectDetailDetailsOptions from "seed/examples/project_details/options/DetailsOptions";
import ProjectDetailForm from "seed/examples/project_details/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/project_details/ProjectDetails.module.css";

function ProjectDetails(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <ProjectDetailListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <ProjectDetailList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <ProjectDetailDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <ProjectDetailDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <ProjectDetailForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:project_detail_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:project_detail_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default ProjectDetails;