import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/dev_stage_statuses/List.module.css";

const DEV_STAGE_STATUSES  = `
{
  devStageStatuses {
    value
    devStage { }
  }
}
`;

function DevStageStatusList(props)
{
  const { url } = props.match;

  const qDevStageStatuses = useQuery(DEV_STAGE_STATUSES);

  if (qDevStageStatuses.loading) return <Loading />;
  if (qDevStageStatuses.error) return "Error";

  const { devStageStatuses } = qDevStageStatuses.data;

  const devStageStatusList = devStageStatuses.map(item =>
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
      { devStageStatusList }
    </div>
  );
}

export default DevStageStatusList;