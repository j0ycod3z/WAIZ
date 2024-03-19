import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/profile_educations/Details.module.css";

const PROFILE_EDUCATION  = `
{
  profileEducation {
    degree
    period
    activitiesGroups
    university { }
    profile { }
  }
}
`;

function ProfileEducationDetails(props) {

  const { profile_education_id }  = props.match.params;
  const qProfileEducation = useDetail(PROFILE_EDUCATION, profile_education_id);

  if (qProfileEducation.loading) return <Loading />;
  if (qProfileEducation.error) return "Error";

  const { profileEducation = {} } = qProfileEducation.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Degree</label><br/>
      <label className={styles.txt}>{profileEducation.degree.toString()}</label>
      <br/>
      <label className={styles.lbl}>Period</label><br/>
      <label className={styles.txt}>{profileEducation.period.toString()}</label>
      <br/>
      <label className={styles.lbl}>Activities groups</label><br/>
      <label className={styles.txt}>{profileEducation.activitiesGroups.toString()}</label>
      <br/>
    </div>
  );
}

export default ProfileEducationDetails;