import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/locales/List.module.css";

const LOCALES  = `
{
  locales {
    ref
    translations { }
  }
}
`;

function LocaleList(props)
{
  const { url } = props.match;

  const qLocales = useQuery(LOCALES);

  if (qLocales.loading) return <Loading />;
  if (qLocales.error) return "Error";

  const { locales } = qLocales.data;

  const localeList = locales.map(item =>
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
      { localeList }
    </div>
  );
}

export default LocaleList;