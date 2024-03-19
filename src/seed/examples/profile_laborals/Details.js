import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/profile_laborals/Details.module.css";

const PROFILE_LABORAL  = `
{
  profileLaboral {
    job
    company
    period
    companyDescription
    profile { }
  }
}
`;

function ProfileLaboralDetails(props) {

  const { profile_laboral_id }  = props.match.params;
  const qProfileLaboral = useDetail(PROFILE_LABORAL, profile_laboral_id);

  if (qProfileLaboral.loading) return <Loading />;
  if (qProfileLaboral.error) return "Error";

  const { profileLaboral = {} } = qProfileLaboral.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Job</label><br/>
      <label className={styles.txt}>{profileLaboral.job.toString()}</label>
      <br/>
      <label className={styles.lbl}>Company</label><br/>
      <label className={styles.txt}>{profileLaboral.company.toString()}</label>
      <br/>
      <label className={styles.lbl}>Period</label><br/>
      <label className={styles.txt}>{profileLaboral.period.toString()}</label>
      <br/>
      <label className={styles.lbl}>Company description</label><br/>
      <label className={styles.txt}>{profileLaboral.companyDescription.toString()}</label>
      <br/>
    </div>
  );
}

export default ProfileLaboralDetails;