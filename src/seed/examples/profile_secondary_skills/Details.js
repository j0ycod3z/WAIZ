import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/profile_secondary_skills/Details.module.css";

const PROFILE_SECONDARY_SKILL  = `
{
  profileSecondarySkill {
    sector
    type
    score
    profile { }
  }
}
`;

function ProfileSecondarySkillDetails(props) {

  const { profile_secondary_skill_id }  = props.match.params;
  const qProfileSecondarySkill = useDetail(PROFILE_SECONDARY_SKILL, profile_secondary_skill_id);

  if (qProfileSecondarySkill.loading) return <Loading />;
  if (qProfileSecondarySkill.error) return "Error";

  const { profileSecondarySkill = {} } = qProfileSecondarySkill.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Sector</label><br/>
      <label className={styles.txt}>{profileSecondarySkill.sector.toString()}</label>
      <br/>
      <label className={styles.lbl}>Type</label><br/>
      <label className={styles.txt}>{profileSecondarySkill.type.toString()}</label>
      <br/>
      <label className={styles.lbl}>Score</label><br/>
      <label className={styles.txt}>{profileSecondarySkill.score.toString()}</label>
      <br/>
    </div>
  );
}

export default ProfileSecondarySkillDetails;