import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/profile_secondary_skills/List.module.css";

const PROFILE_SECONDARY_SKILLS  = `
{
  profileSecondarySkills {
    sector
    type
    score
    profile { }
  }
}
`;

function ProfileSecondarySkillList(props)
{
  const { url } = props.match;

  const qProfileSecondarySkills = useQuery(PROFILE_SECONDARY_SKILLS);

  if (qProfileSecondarySkills.loading) return <Loading />;
  if (qProfileSecondarySkills.error) return "Error";

  const { profileSecondarySkills } = qProfileSecondarySkills.data;

  const profileSecondarySkillList = profileSecondarySkills.map(item =>
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
      { profileSecondarySkillList }
    </div>
  );
}

export default ProfileSecondarySkillList;