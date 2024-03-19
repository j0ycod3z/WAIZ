import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/hypothesis_logs/List.module.css";

const HYPOTHESIS_LOGS  = `
{
  hypothesisLogs {
    date
    text
    isValid
    isTested
    ref { }
  }
}
`;

function HypothesisLogList(props)
{
  const { url } = props.match;

  const qHypothesisLogs = useQuery(HYPOTHESIS_LOGS);

  if (qHypothesisLogs.loading) return <Loading />;
  if (qHypothesisLogs.error) return "Error";

  const { hypothesisLogs } = qHypothesisLogs.data;

  const hypothesisLogList = hypothesisLogs.map(item =>
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
      { hypothesisLogList }
    </div>
  );
}

export default HypothesisLogList;