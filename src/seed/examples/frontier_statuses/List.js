import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/frontier_statuses/List.module.css";

const FRONTIER_STATUSES  = `
{
  frontierStatuses {
    value
    frontier { }
  }
}
`;

function FrontierStatusList(props)
{
  const { url } = props.match;

  const qFrontierStatuses = useQuery(FRONTIER_STATUSES);

  if (qFrontierStatuses.loading) return <Loading />;
  if (qFrontierStatuses.error) return "Error";

  const { frontierStatuses } = qFrontierStatuses.data;

  const frontierStatusList = frontierStatuses.map(item =>
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
      { frontierStatusList }
    </div>
  );
}

export default FrontierStatusList;