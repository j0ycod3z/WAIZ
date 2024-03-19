import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/kb_items/List.module.css";

const KB_ITEMS  = `
{
  kbItems {
    index
    videoUrl
    videoId
    source
    sectionIndex
    lText { }
    lTitle { }
    section { }
    files { }
  }
}
`;

function KbItemList(props)
{
  const { url } = props.match;

  const qKbItems = useQuery(KB_ITEMS);

  if (qKbItems.loading) return <Loading />;
  if (qKbItems.error) return "Error";

  const { kbItems } = qKbItems.data;

  const kbItemList = kbItems.map(item =>
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
      { kbItemList }
    </div>
  );
}

export default KbItemList;