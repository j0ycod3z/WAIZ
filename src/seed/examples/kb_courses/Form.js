import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/kb_courses/Form.module.css";

const LOCALES  = `
{
  locales { }
}
`;

function KbCourseForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { kb_course_id }  = props.match.params;
  const editMode = kb_course_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_KB_COURSE, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_KB_COURSE, saveOptions);

  const qKbCourse = useDetail(queries.KB_COURSE, kb_course_id);
  const qLocales = useQuery(LOCALES);

  if (editMode && qKbCourse.loading) return <Loading />;
  if (editMode && qKbCourse.error) return "Error";

  const onSubmit = (values) => {
    values.id = kb_course_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { kbCourse = {} } = qKbCourse.data;
  const { locales = [] } = qLocales.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Kb course</div>
      <div className={styles.form}>
        <Formik
           initialValues={kbCourse}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <div>
          <label className={styles.lbl}>L name</label>
          <Field component="select" name="lName.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { locales.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
          {state.error ?
            <div className={styles.error}>{state.error}</div> : null}
          <button type="submit" className={styles.submit}>Send</button>
        </form>
        )}
        />
      </div>
    </div>
  );
}

export default KbCourseForm;