import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/trl_questions/List.module.css";

const TRL_QUESTIONS  = `
{
  trlQuestions {
    lName { }
    trl { }
  }
}
`;

function TrlQuestionList(props)
{
  const { url } = props.match;

  const qTrlQuestions = useQuery(TRL_QUESTIONS);

  if (qTrlQuestions.loading) return <Loading />;
  if (qTrlQuestions.error) return "Error";

  const { trlQuestions } = qTrlQuestions.data;

  const trlQuestionList = trlQuestions.map(item =>
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
      { trlQuestionList }
    </div>
  );
}

export default TrlQuestionList;