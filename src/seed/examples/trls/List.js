import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/trls/List.module.css";

const TRLS  = `
{
  trls {
    lName { }
    lDescription { }
  }
}
`;

function TrlList(props)
{
  const { url } = props.match;

  const qTrls = useQuery(TRLS);

  if (qTrls.loading) return <Loading />;
  if (qTrls.error) return "Error";

  const { trls } = qTrls.data;

  const trlList = trls.map(item =>
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
      { trlList }
    </div>
  );
}

export default TrlList;