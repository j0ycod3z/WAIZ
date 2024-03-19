import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/kb_sections/Form.module.css";

const LOCALES  = `
{
  locales { }
}
`;

const KB_COURSES  = `
{
  kbCourses { }
}
`;

function KbSectionForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { kb_section_id }  = props.match.params;
  const editMode = kb_section_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_KB_SECTION, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_KB_SECTION, saveOptions);

  const qKbSection = useDetail(queries.KB_SECTION, kb_section_id);
  const qLocales = useQuery(LOCALES);
  const qKbCourses = useQuery(KB_COURSES);

  if (editMode && qKbSection.loading) return <Loading />;
  if (editMode && qKbSection.error) return "Error";

  const onSubmit = (values) => {
    values.id = kb_section_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { kbSection = {} } = qKbSection.data;
  const { locales = [] } = qLocales.data;
  const { kbCourses = [] } = qKbCourses.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Kb section</div>
      <div className={styles.form}>
        <Formik
           initialValues={kbSection}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Index</label><br/>
          <Field type="number" name="index"
            className={styles.txt} />
          <br/>
          
          <div>
          <label className={styles.lbl}>L name</label>
          <Field component="select" name="lName.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { locales.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
          <div>
          <label className={styles.lbl}>L description</label>
          <Field component="select" name="lDescription.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { locales.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
          <div>
          <label className={styles.lbl}>Course</label>
          <Field component="select" name="course.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { kbCourses.map((e, idx) => <option value={e.id}>{e.id}</option>) }
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

export default KbSectionForm;