import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/areas/List.module.css";

const AREAS  = `
{
  areas {
    category
    lName { }
    canvasType { }
    tags { }
  }
}
`;

function AreaList(props)
{
  const { url } = props.match;

  const qAreas = useQuery(AREAS);

  if (qAreas.loading) return <Loading />;
  if (qAreas.error) return "Error";

  const { areas } = qAreas.data;

  const areaList = areas.map(item =>
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
      { areaList }
    </div>
  );
}

export default AreaList;