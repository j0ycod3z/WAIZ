import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/project_features/Details.module.css";

const PROJECT_FEATURE  = `
{
  projectFeature {
    description
  }
}
`;

function ProjectFeatureDetails(props) {

  const { project_feature_id }  = props.match.params;
  const qProjectFeature = useDetail(PROJECT_FEATURE, project_feature_id);

  if (qProjectFeature.loading) return <Loading />;
  if (qProjectFeature.error) return "Error";

  const { projectFeature = {} } = qProjectFeature.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Description</label><br/>
      <label className={styles.txt}>{projectFeature.description.toString()}</label>
      <br/>
    </div>
  );
}

export default ProjectFeatureDetails;