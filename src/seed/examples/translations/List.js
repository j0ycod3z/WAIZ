import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/translations/List.module.css";

const TRANSLATIONS  = `
{
  translations {
    value
    lang
    locale { }
  }
}
`;

function TranslationList(props)
{
  const { url } = props.match;

  const qTranslations = useQuery(TRANSLATIONS);

  if (qTranslations.loading) return <Loading />;
  if (qTranslations.error) return "Error";

  const { translations } = qTranslations.data;

  const translationList = translations.map(item =>
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
      { translationList }
    </div>
  );
}

export default TranslationList;