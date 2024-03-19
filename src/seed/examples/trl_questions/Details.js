import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/trl_questions/Details.module.css";

const TRL_QUESTION  = `
{
  trlQuestion {
    lName { }
    trl { }
  }
}
`;

function TrlQuestionDetails(props) {

  const { trl_question_id }  = props.match.params;
  const qTrlQuestion = useDetail(TRL_QUESTION, trl_question_id);

  if (qTrlQuestion.loading) return <Loading />;
  if (qTrlQuestion.error) return "Error";

  const { trlQuestion = {} } = qTrlQuestion.data;

  return (
    <div className={styles.module}>
    </div>
  );
}

export default TrlQuestionDetails;