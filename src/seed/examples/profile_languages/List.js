import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/profile_languages/List.module.css";

const PROFILE_LANGUAGES  = `
{
  profileLanguages {
    name
    profile { }
  }
}
`;

function ProfileLanguageList(props)
{
  const { url } = props.match;

  const qProfileLanguages = useQuery(PROFILE_LANGUAGES);

  if (qProfileLanguages.loading) return <Loading />;
  if (qProfileLanguages.error) return "Error";

  const { profileLanguages } = qProfileLanguages.data;

  const profileLanguageList = profileLanguages.map(item =>
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
      { profileLanguageList }
    </div>
  );
}

export default ProfileLanguageList;