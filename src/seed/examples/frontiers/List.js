import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/frontiers/List.module.css";

const FRONTIERS  = `
{
  frontiers {
    category
    lName { }
  }
}
`;

function FrontierList(props)
{
  const { url } = props.match;

  const qFrontiers = useQuery(FRONTIERS);

  if (qFrontiers.loading) return <Loading />;
  if (qFrontiers.error) return "Error";

  const { frontiers } = qFrontiers.data;

  const frontierList = frontiers.map(item =>
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
      { frontierList }
    </div>
  );
}

export default FrontierList;