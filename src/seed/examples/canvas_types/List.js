import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/canvas_types/List.module.css";

const CANVAS_TYPES  = `
{
  canvasTypes {
    type
    lName { }
    lLegend { }
    areas { }
  }
}
`;

function CanvasTypeList(props)
{
  const { url } = props.match;

  const qCanvasTypes = useQuery(CANVAS_TYPES);

  if (qCanvasTypes.loading) return <Loading />;
  if (qCanvasTypes.error) return "Error";

  const { canvasTypes } = qCanvasTypes.data;

  const canvasTypeList = canvasTypes.map(item =>
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
      { canvasTypeList }
    </div>
  );
}

export default CanvasTypeList;