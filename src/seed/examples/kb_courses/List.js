import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/kb_courses/List.module.css";

const KB_COURSES  = `
{
  kbCourses {
    lName { }
    sections { }
  }
}
`;

function KbCourseList(props)
{
  const { url } = props.match;

  const qKbCourses = useQuery(KB_COURSES);

  if (qKbCourses.loading) return <Loading />;
  if (qKbCourses.error) return "Error";

  const { kbCourses } = qKbCourses.data;

  const kbCourseList = kbCourses.map(item =>
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
      { kbCourseList }
    </div>
  );
}

export default KbCourseList;