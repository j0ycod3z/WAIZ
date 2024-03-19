import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/universities/Details.module.css";

const UNIVERSITY  = `
{
  university {
    name
    country
  }
}
`;

function UniversityDetails(props) {

  const { university_id }  = props.match.params;
  const qUniversity = useDetail(UNIVERSITY, university_id);

  if (qUniversity.loading) return <Loading />;
  if (qUniversity.error) return "Error";

  const { university = {} } = qUniversity.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Name</label><br/>
      <label className={styles.txt}>{university.name.toString()}</label>
      <br/>
      <label className={styles.lbl}>Country</label><br/>
      <label className={styles.txt}>{university.country.toString()}</label>
      <br/>
    </div>
  );
}

export default UniversityDetails;