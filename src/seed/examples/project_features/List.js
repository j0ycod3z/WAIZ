import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/project_features/List.module.css";

const PROJECT_FEATURES  = `
{
  projectFeatures {
    description
  }
}
`;

function ProjectFeatureList(props)
{
  const { url } = props.match;

  const qProjectFeatures = useQuery(PROJECT_FEATURES);

  if (qProjectFeatures.loading) return <Loading />;
  if (qProjectFeatures.error) return "Error";

  const { projectFeatures } = qProjectFeatures.data;

  const projectFeatureList = projectFeatures.map(item =>
    <NavLink
      key={item.id}
      to={`${url}/${item.id}`}
      className={styles.item}
      activeClassName={styles.active}>
        <div className={styles.title}>{item.id}</div>
        <div className={styles.subtitle}>{JSON.stringify(item)}</div>
    </NavLink>);

  return (
    <div className={styles.module}>
      { projectFeatureList }
    </div>
  );
}

export default ProjectFeatureList;