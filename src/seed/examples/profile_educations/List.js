import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/profile_educations/List.module.css";

const PROFILE_EDUCATIONS  = `
{
  profileEducations {
    degree
    period
    activitiesGroups
    university { }
    profile { }
  }
}
`;

function ProfileEducationList(props)
{
  const { url } = props.match;

  const qProfileEducations = useQuery(PROFILE_EDUCATIONS);

  if (qProfileEducations.loading) return <Loading />;
  if (qProfileEducations.error) return "Error";

  const { profileEducations } = qProfileEducations.data;

  const profileEducationList = profileEducations.map(item =>
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
      { profileEducationList }
    </div>
  );
}

export default ProfileEducationList;