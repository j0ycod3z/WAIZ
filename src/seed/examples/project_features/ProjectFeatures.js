import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import ProjectFeatureDetails from "seed/examples/project_features/Details";
import ProjectFeatureList from "seed/examples/project_features/List";
import ProjectFeatureListOptions from "seed/examples/project_features/options/ListOptions";
import ProjectFeatureDetailsOptions from "seed/examples/project_features/options/DetailsOptions";
import ProjectFeatureForm from "seed/examples/project_features/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/project_features/ProjectFeatures.module.css";

function ProjectFeatures(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <ProjectFeatureListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <ProjectFeatureList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <ProjectFeatureDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <ProjectFeatureDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <ProjectFeatureForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:project_feature_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:project_feature_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default ProjectFeatures;