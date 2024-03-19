import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/universities/List.module.css";

const UNIVERSITIES  = `
{
  universities {
    name
    country
  }
}
`;

function UniversityList(props)
{
  const { url } = props.match;

  const qUniversities = useQuery(UNIVERSITIES);

  if (qUniversities.loading) return <Loading />;
  if (qUniversities.error) return "Error";

  const { universities } = qUniversities.data;

  const universityList = universities.map(item =>
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
      { universityList }
    </div>
  );
}

export default UniversityList;