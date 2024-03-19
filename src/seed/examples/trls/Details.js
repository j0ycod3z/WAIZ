import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/trls/Details.module.css";

const TRL  = `
{
  trl {
    lName { }
    lDescription { }
  }
}
`;

function TrlDetails(props) {

  const { trl_id }  = props.match.params;
  const qTrl = useDetail(TRL, trl_id);

  if (qTrl.loading) return <Loading />;
  if (qTrl.error) return "Error";

  const { trl = {} } = qTrl.data;

  return (
    <div className={styles.module}>
    </div>
  );
}

export default TrlDetails;