import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/profile_primary_skills/Details.module.css";

const PROFILE_PRIMARY_SKILL  = `
{
  profilePrimarySkill {
    type
    score
    profile { }
  }
}
`;

function ProfilePrimarySkillDetails(props) {

  const { profile_primary_skill_id }  = props.match.params;
  const qProfilePrimarySkill = useDetail(PROFILE_PRIMARY_SKILL, profile_primary_skill_id);

  if (qProfilePrimarySkill.loading) return <Loading />;
  if (qProfilePrimarySkill.error) return "Error";

  const { profilePrimarySkill = {} } = qProfilePrimarySkill.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Type</label><br/>
      <label className={styles.txt}>{profilePrimarySkill.type.toString()}</label>
      <br/>
      <label className={styles.lbl}>Score</label><br/>
      <label className={styles.txt}>{profilePrimarySkill.score.toString()}</label>
      <br/>
    </div>
  );
}

export default ProfilePrimarySkillDetails;