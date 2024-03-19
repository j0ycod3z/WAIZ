import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/area_helps/List.module.css";

const AREA_HELPS  = `
{
  areaHelps {
    lContent { }
    lVideoId { }
    area { }
  }
}
`;

function AreaHelpList(props)
{
  const { url } = props.match;

  const qAreaHelps = useQuery(AREA_HELPS);

  if (qAreaHelps.loading) return <Loading />;
  if (qAreaHelps.error) return "Error";

  const { areaHelps } = qAreaHelps.data;

  const areaHelpList = areaHelps.map(item =>
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
      { areaHelpList }
    </div>
  );
}

export default AreaHelpList;