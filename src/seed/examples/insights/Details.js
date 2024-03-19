import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/insights/Details.module.css";

const INSIGHT  = `
{
  insight {
    text
    type
    v4Ref
    hypothesis { }
    area { }
    interview { }
    project { }
    creator { }
  }
}
`;

function InsightDetails(props) {

  const { insight_id }  = props.match.params;
  const qInsight = useDetail(INSIGHT, insight_id);

  if (qInsight.loading) return <Loading />;
  if (qInsight.error) return "Error";

  const { insight = {} } = qInsight.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Text</label><br/>
      <label className={styles.txt}>{insight.text.toString()}</label>
      <br/>
      <label className={styles.lbl}>Type</label><br/>
      <label className={styles.txt}>{insight.type.toString()}</label>
      <br/>
      <label className={styles.lbl}>V4 ref</label><br/>
      <label className={styles.txt}>{insight.v4Ref.toString()}</label>
      <br/>
    </div>
  );
}

export default InsightDetails;