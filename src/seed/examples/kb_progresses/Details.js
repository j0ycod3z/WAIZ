import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/kb_progresses/Details.module.css";

const KB_PROGRESS  = `
{
  kbProgress {
    value
    user { }
    item { }
  }
}
`;

function KbProgressDetails(props) {

  const { kb_progress_id }  = props.match.params;
  const qKbProgress = useDetail(KB_PROGRESS, kb_progress_id);

  if (qKbProgress.loading) return <Loading />;
  if (qKbProgress.error) return "Error";

  const { kbProgress = {} } = qKbProgress.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Value</label><br/>
      <label className={styles.txt}>{kbProgress.value.toString()}</label>
      <br/>
    </div>
  );
}

export default KbProgressDetails;