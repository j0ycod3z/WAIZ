import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/profile_laborals/List.module.css";

const PROFILE_LABORALS  = `
{
  profileLaborals {
    job
    company
    period
    companyDescription
    profile { }
  }
}
`;

function ProfileLaboralList(props)
{
  const { url } = props.match;

  const qProfileLaborals = useQuery(PROFILE_LABORALS);

  if (qProfileLaborals.loading) return <Loading />;
  if (qProfileLaborals.error) return "Error";

  const { profileLaborals } = qProfileLaborals.data;

  const profileLaboralList = profileLaborals.map(item =>
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
      { profileLaboralList }
    </div>
  );
}

export default ProfileLaboralList;