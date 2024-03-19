import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/profile_primary_skills/List.module.css";

const PROFILE_PRIMARY_SKILLS  = `
{
  profilePrimarySkills {
    type
    score
    profile { }
  }
}
`;

function ProfilePrimarySkillList(props)
{
  const { url } = props.match;

  const qProfilePrimarySkills = useQuery(PROFILE_PRIMARY_SKILLS);

  if (qProfilePrimarySkills.loading) return <Loading />;
  if (qProfilePrimarySkills.error) return "Error";

  const { profilePrimarySkills } = qProfilePrimarySkills.data;

  const profilePrimarySkillList = profilePrimarySkills.map(item =>
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
      { profilePrimarySkillList }
    </div>
  );
}

export default ProfilePrimarySkillList;