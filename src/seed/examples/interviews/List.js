import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/interviews/List.module.css";

const INTERVIEWS  = `
{
  interviews {
    transcript
    channel
    intervieweeType
    intervieweeName
    intervieweeRol
    intervieweeCompany
    intervieweeContact
    v4Ref
    intervieweeTag { }
    hypothesis { }
    canvas { }
    project { }
    creator { }
  }
}
`;

function InterviewList(props)
{
  const { url } = props.match;

  const qInterviews = useQuery(INTERVIEWS);

  if (qInterviews.loading) return <Loading />;
  if (qInterviews.error) return "Error";

  const { interviews } = qInterviews.data;

  const interviewList = interviews.map(item =>
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
      { interviewList }
    </div>
  );
}

export default InterviewList;