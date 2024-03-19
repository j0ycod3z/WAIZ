import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/dev_stages/List.module.css";

const DEV_STAGES  = `
{
  devStages {
    category
    lName { }
  }
}
`;

function DevStageList(props)
{
  const { url } = props.match;

  const qDevStages = useQuery(DEV_STAGES);

  if (qDevStages.loading) return <Loading />;
  if (qDevStages.error) return "Error";

  const { devStages } = qDevStages.data;

  const devStageList = devStages.map(item =>
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
      { devStageList }
    </div>
  );
}

export default DevStageList;