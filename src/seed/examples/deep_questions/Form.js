import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/deep_questions/Form.module.css";

const LOCALES  = `
{
  locales { }
}
`;

const AREAS  = `
{
  areas { }
}
`;

function DeepQuestionForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { deep_question_id }  = props.match.params;
  const editMode = deep_question_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_DEEP_QUESTION, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_DEEP_QUESTION, saveOptions);

  const qDeepQuestion = useDetail(queries.DEEP_QUESTION, deep_question_id);
  const qLocales = useQuery(LOCALES);
  const qAreas = useQuery(AREAS);

  if (editMode && qDeepQuestion.loading) return <Loading />;
  if (editMode && qDeepQuestion.error) return "Error";

  const onSubmit = (values) => {
    values.id = deep_question_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { deepQuestion = {} } = qDeepQuestion.data;
  const { locales = [] } = qLocales.data;
  const { areas = [] } = qAreas.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Deep question</div>
      <div className={styles.form}>
        <Formik
           initialValues={deepQuestion}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <div>
          <label className={styles.lbl}>L content</label>
          <Field component="select" name="lContent.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { locales.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
          <div>
          <label className={styles.lbl}>Area</label>
          <Field component="select" name="area.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { areas.map((e, idx) => <option value={e.id}>{e.id}</option>) }
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

export default DeepQuestionForm;