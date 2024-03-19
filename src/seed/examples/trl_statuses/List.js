import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/trl_statuses/List.module.css";

const TRL_STATUSES  = `
{
  trlStatuses {
    value
    question { }
  }
}
`;

function TrlStatusList(props)
{
  const { url } = props.match;

  const qTrlStatuses = useQuery(TRL_STATUSES);

  if (qTrlStatuses.loading) return <Loading />;
  if (qTrlStatuses.error) return "Error";

  const { trlStatuses } = qTrlStatuses.data;

  const trlStatusList = trlStatuses.map(item =>
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
      { trlStatusList }
    </div>
  );
}

export default TrlStatusList;