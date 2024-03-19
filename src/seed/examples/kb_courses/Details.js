import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/kb_courses/Details.module.css";

const KB_COURSE  = `
{
  kbCourse {
    lName { }
    sections { }
  }
}
`;

function KbCourseDetails(props) {

  const { kb_course_id }  = props.match.params;
  const qKbCourse = useDetail(KB_COURSE, kb_course_id);

  if (qKbCourse.loading) return <Loading />;
  if (qKbCourse.error) return "Error";

  const { kbCourse = {} } = qKbCourse.data;

  return (
    <div className={styles.module}>
    </div>
  );
}

export default KbCourseDetails;