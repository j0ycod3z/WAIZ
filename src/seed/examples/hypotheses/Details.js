import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/hypotheses/Details.module.css";

const HYPOTHESIS  = `
{
  hypothesis {
    text
    isActive
    isValid
    isTested
    color
    v4Ref
    area { }
    blankArea { }
    canvas { }
    creator { }
    tags { }
    customers { }
  }
}
`;

function HypothesisDetails(props) {

  const { hypothesis_id }  = props.match.params;
  const qHypothesis = useDetail(HYPOTHESIS, hypothesis_id);

  if (qHypothesis.loading) return <Loading />;
  if (qHypothesis.error) return "Error";

  const { hypothesis = {} } = qHypothesis.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Text</label><br/>
      <label className={styles.txt}>{hypothesis.text.toString()}</label>
      <br/>
      <label className={styles.lbl}>Is active</label><br/>
      <label className={styles.txt}>{hypothesis.isActive.toString()}</label>
      <br/>
      <label className={styles.lbl}>Is valid</label><br/>
      <label className={styles.txt}>{hypothesis.isValid.toString()}</label>
      <br/>
      <label className={styles.lbl}>Is tested</label><br/>
      <label className={styles.txt}>{hypothesis.isTested.toString()}</label>
      <br/>
      <label className={styles.lbl}>Color</label><br/>
      <label className={styles.txt}>{hypothesis.color.toString()}</label>
      <br/>
      <label className={styles.lbl}>V4 ref</label><br/>
      <label className={styles.txt}>{hypothesis.v4Ref.toString()}</label>
      <br/>
    </div>
  );
}

export default HypothesisDetails;