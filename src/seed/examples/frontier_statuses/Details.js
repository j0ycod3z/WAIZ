import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/frontier_statuses/Details.module.css";

const FRONTIER_STATUS  = `
{
  frontierStatus {
    value
    frontier { }
  }
}
`;

function FrontierStatusDetails(props) {

  const { frontier_status_id }  = props.match.params;
  const qFrontierStatus = useDetail(FRONTIER_STATUS, frontier_status_id);

  if (qFrontierStatus.loading) return <Loading />;
  if (qFrontierStatus.error) return "Error";

  const { frontierStatus = {} } = qFrontierStatus.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Value</label><br/>
      <label className={styles.txt}>{frontierStatus.value.toString()}</label>
      <br/>
    </div>
  );
}

export default FrontierStatusDetails;