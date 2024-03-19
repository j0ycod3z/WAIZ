import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/frontiers/Details.module.css";

const FRONTIER  = `
{
  frontier {
    category
    lName { }
  }
}
`;

function FrontierDetails(props) {

  const { frontier_id }  = props.match.params;
  const qFrontier = useDetail(FRONTIER, frontier_id);

  if (qFrontier.loading) return <Loading />;
  if (qFrontier.error) return "Error";

  const { frontier = {} } = qFrontier.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Category</label><br/>
      <label className={styles.txt}>{frontier.category.toString()}</label>
      <br/>
    </div>
  );
}

export default FrontierDetails;