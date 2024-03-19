import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/fits/Details.module.css";

const FIT  = `
{
  fit {
    category
    lName { }
  }
}
`;

function FitDetails(props) {

  const { fit_id }  = props.match.params;
  const qFit = useDetail(FIT, fit_id);

  if (qFit.loading) return <Loading />;
  if (qFit.error) return "Error";

  const { fit = {} } = qFit.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Category</label><br/>
      <label className={styles.txt}>{fit.category.toString()}</label>
      <br/>
    </div>
  );
}

export default FitDetails;