import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/deep_questions/Details.module.css";

const DEEP_QUESTION  = `
{
  deepQuestion {
    lContent { }
    area { }
  }
}
`;

function DeepQuestionDetails(props) {

  const { deep_question_id }  = props.match.params;
  const qDeepQuestion = useDetail(DEEP_QUESTION, deep_question_id);

  if (qDeepQuestion.loading) return <Loading />;
  if (qDeepQuestion.error) return "Error";

  const { deepQuestion = {} } = qDeepQuestion.data;

  return (
    <div className={styles.module}>
    </div>
  );
}

export default DeepQuestionDetails;