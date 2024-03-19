import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/projects/List.module.css";

const PROJECTS  = `
{
  projects {
    name
    description
    image
    isActive
    hasPhase1
    hasPhase21
    hasPhase22
    hasPhase23
    hasPhase24
    hasPhase25
    hasPhase3
    hasPhase4
    hasPhase5
    v4Ref
    canvasType2 { }
    admin { }
    cohort { }
    mentors { }
    members { }
    canvas { }
  }
}
`;

function ProjectList(props)
{
  const { url } = props.match;

  const qProjects = useQuery(PROJECTS);

  if (qProjects.loading) return <Loading />;
  if (qProjects.error) return "Error";

  const { projects } = qProjects.data;

  const projectList = projects.map(item =>
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
      { projectList }
    </div>
  );
}

export default ProjectList;