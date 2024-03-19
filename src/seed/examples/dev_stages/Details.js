import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/dev_stages/Details.module.css";

const DEV_STAGE  = `
{
  devStage {
    category
    lName { }
  }
}
`;

function DevStageDetails(props) {

  const { dev_stage_id }  = props.match.params;
  const qDevStage = useDetail(DEV_STAGE, dev_stage_id);

  if (qDevStage.loading) return <Loading />;
  if (qDevStage.error) return "Error";

  const { devStage = {} } = qDevStage.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Category</label><br/>
      <label className={styles.txt}>{devStage.category.toString()}</label>
      <br/>
    </div>
  );
}

export default DevStageDetails;