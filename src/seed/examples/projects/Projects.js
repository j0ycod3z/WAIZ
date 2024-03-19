import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import ProjectDetails from "seed/examples/projects/Details";
import ProjectList from "seed/examples/projects/List";
import ProjectListOptions from "seed/examples/projects/options/ListOptions";
import ProjectDetailsOptions from "seed/examples/projects/options/DetailsOptions";
import ProjectForm from "seed/examples/projects/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/projects/Projects.module.css";

function Projects(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <ProjectListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <ProjectList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <ProjectDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <ProjectDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <ProjectForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:project_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:project_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default Projects;