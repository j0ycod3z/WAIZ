import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/cohorts/Details.module.css";

const COHORT  = `
{
  cohort {
    name
    date
    v4Ref
    admin { }
    mentors { }
    instructors { }
  }
}
`;

function CohortDetails(props) {

  const { cohort_id }  = props.match.params;
  const qCohort = useDetail(COHORT, cohort_id);

  if (qCohort.loading) return <Loading />;
  if (qCohort.error) return "Error";

  const { cohort = {} } = qCohort.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Name</label><br/>
      <label className={styles.txt}>{cohort.name.toString()}</label>
      <br/>
      <label className={styles.lbl}>Date</label><br/>
      <label className={styles.txt}>{cohort.date.toString()}</label>
      <br/>
      <label className={styles.lbl}>V4 ref</label><br/>
      <label className={styles.txt}>{cohort.v4Ref.toString()}</label>
      <br/>
    </div>
  );
}

export default CohortDetails;