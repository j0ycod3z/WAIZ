import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/cohorts/List.module.css";

const COHORTS  = `
{
  cohorts {
    name
    date
    v4Ref
    admin { }
    mentors { }
    instructors { }
  }
}
`;

function CohortList(props)
{
  const { url } = props.match;

  const qCohorts = useQuery(COHORTS);

  if (qCohorts.loading) return <Loading />;
  if (qCohorts.error) return "Error";

  const { cohorts } = qCohorts.data;

  const cohortList = cohorts.map(item =>
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
      { cohortList }
    </div>
  );
}

export default CohortList;