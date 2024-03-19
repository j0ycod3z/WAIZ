import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/dev_stage_statuses/Details.module.css";

const DEV_STAGE_STATUS  = `
{
  devStageStatus {
    value
    devStage { }
  }
}
`;

function DevStageStatusDetails(props) {

  const { dev_stage_status_id }  = props.match.params;
  const qDevStageStatus = useDetail(DEV_STAGE_STATUS, dev_stage_status_id);

  if (qDevStageStatus.loading) return <Loading />;
  if (qDevStageStatus.error) return "Error";

  const { devStageStatus = {} } = qDevStageStatus.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Value</label><br/>
      <label className={styles.txt}>{devStageStatus.value.toString()}</label>
      <br/>
    </div>
  );
}

export default DevStageStatusDetails;