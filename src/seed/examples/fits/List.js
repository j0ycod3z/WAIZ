import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/fits/List.module.css";

const FITS  = `
{
  fits {
    category
    lName { }
  }
}
`;

function FitList(props)
{
  const { url } = props.match;

  const qFits = useQuery(FITS);

  if (qFits.loading) return <Loading />;
  if (qFits.error) return "Error";

  const { fits } = qFits.data;

  const fitList = fits.map(item =>
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
      { fitList }
    </div>
  );
}

export default FitList;