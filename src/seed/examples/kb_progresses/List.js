import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/kb_progresses/List.module.css";

const KB_PROGRESSES  = `
{
  kbProgresses {
    value
    user { }
    item { }
  }
}
`;

function KbProgressList(props)
{
  const { url } = props.match;

  const qKbProgresses = useQuery(KB_PROGRESSES);

  if (qKbProgresses.loading) return <Loading />;
  if (qKbProgresses.error) return "Error";

  const { kbProgresses } = qKbProgresses.data;

  const kbProgressList = kbProgresses.map(item =>
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
      { kbProgressList }
    </div>
  );
}

export default KbProgressList;