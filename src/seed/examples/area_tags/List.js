import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/area_tags/List.module.css";

const AREA_TAGS  = `
{
  areaTags {
    lName { }
  }
}
`;

function AreaTagList(props)
{
  const { url } = props.match;

  const qAreaTags = useQuery(AREA_TAGS);

  if (qAreaTags.loading) return <Loading />;
  if (qAreaTags.error) return "Error";

  const { areaTags } = qAreaTags.data;

  const areaTagList = areaTags.map(item =>
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
      { areaTagList }
    </div>
  );
}

export default AreaTagList;