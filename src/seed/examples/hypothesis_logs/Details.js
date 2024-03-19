import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/hypothesis_logs/Details.module.css";

const HYPOTHESIS_LOG  = `
{
  hypothesisLog {
    date
    text
    isValid
    isTested
    ref { }
  }
}
`;

function HypothesisLogDetails(props) {

  const { hypothesis_log_id }  = props.match.params;
  const qHypothesisLog = useDetail(HYPOTHESIS_LOG, hypothesis_log_id);

  if (qHypothesisLog.loading) return <Loading />;
  if (qHypothesisLog.error) return "Error";

  const { hypothesisLog = {} } = qHypothesisLog.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Date</label><br/>
      <label className={styles.txt}>{hypothesisLog.date.toString()}</label>
      <br/>
      <label className={styles.lbl}>Text</label><br/>
      <label className={styles.txt}>{hypothesisLog.text.toString()}</label>
      <br/>
      <label className={styles.lbl}>Is valid</label><br/>
      <label className={styles.txt}>{hypothesisLog.isValid.toString()}</label>
      <br/>
      <label className={styles.lbl}>Is tested</label><br/>
      <label className={styles.txt}>{hypothesisLog.isTested.toString()}</label>
      <br/>
    </div>
  );
}

export default HypothesisLogDetails;