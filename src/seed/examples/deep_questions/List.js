import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/deep_questions/List.module.css";

const DEEP_QUESTIONS  = `
{
  deepQuestions {
    lContent { }
    area { }
  }
}
`;

function DeepQuestionList(props)
{
  const { url } = props.match;

  const qDeepQuestions = useQuery(DEEP_QUESTIONS);

  if (qDeepQuestions.loading) return <Loading />;
  if (qDeepQuestions.error) return "Error";

  const { deepQuestions } = qDeepQuestions.data;

  const deepQuestionList = deepQuestions.map(item =>
    <NavLink
      key={item.id}
      to={`${url}/${item.id}`}
      className={styles.item}
      activeClassName={styles.active}>
        <div className={styles.title}>{item.id}</div>
        <div className={styles.subtitle}>{JSON.stringify(item)}</div>
    </NavLink>);

  return (
    <div className={styles.module}>
      { deepQuestionList }
    </div>
  );
}

export default DeepQuestionList;