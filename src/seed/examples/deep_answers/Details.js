import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/deep_answers/Details.module.css";

const DEEP_ANSWER  = `
{
  deepAnswer {
    text
    question { }
    canvas { }
  }
}
`;

function DeepAnswerDetails(props) {

  const { deep_answer_id }  = props.match.params;
  const qDeepAnswer = useDetail(DEEP_ANSWER, deep_answer_id);

  if (qDeepAnswer.loading) return <Loading />;
  if (qDeepAnswer.error) return "Error";

  const { deepAnswer = {} } = qDeepAnswer.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Text</label><br/>
      <label className={styles.txt}>{deepAnswer.text.toString()}</label>
      <br/>
    </div>
  );
}

export default DeepAnswerDetails;