import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/trl_statuses/Details.module.css";

const TRL_STATUS  = `
{
  trlStatus {
    value
    question { }
  }
}
`;

function TrlStatusDetails(props) {

  const { trl_status_id }  = props.match.params;
  const qTrlStatus = useDetail(TRL_STATUS, trl_status_id);

  if (qTrlStatus.loading) return <Loading />;
  if (qTrlStatus.error) return "Error";

  const { trlStatus = {} } = qTrlStatus.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Value</label><br/>
      <label className={styles.txt}>{trlStatus.value.toString()}</label>
      <br/>
    </div>
  );
}

export default TrlStatusDetails;