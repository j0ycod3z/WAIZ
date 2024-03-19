import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/fit_statuses/Details.module.css";

const FIT_STATUS  = `
{
  fitStatus {
    value
    fit { }
  }
}
`;

function FitStatusDetails(props) {

  const { fit_status_id }  = props.match.params;
  const qFitStatus = useDetail(FIT_STATUS, fit_status_id);

  if (qFitStatus.loading) return <Loading />;
  if (qFitStatus.error) return "Error";

  const { fitStatus = {} } = qFitStatus.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Value</label><br/>
      <label className={styles.txt}>{fitStatus.value.toString()}</label>
      <br/>
    </div>
  );
}

export default FitStatusDetails;