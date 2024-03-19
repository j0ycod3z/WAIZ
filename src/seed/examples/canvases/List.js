import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/canvases/List.module.css";

const CANVASES  = `
{
  canvases {
    type { }
    project { }
  }
}
`;

function CanvasList(props)
{
  const { url } = props.match;

  const qCanvases = useQuery(CANVASES);

  if (qCanvases.loading) return <Loading />;
  if (qCanvases.error) return "Error";

  const { canvases } = qCanvases.data;

  const canvasList = canvases.map(item =>
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
      { canvasList }
    </div>
  );
}

export default CanvasList;