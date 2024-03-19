import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/deep_answers/Form.module.css";

const DEEP_QUESTIONS  = `
{
  deepQuestions { }
}
`;

const CANVASES  = `
{
  canvases { }
}
`;

function DeepAnswerForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { deep_answer_id }  = props.match.params;
  const editMode = deep_answer_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_DEEP_ANSWER, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_DEEP_ANSWER, saveOptions);

  const qDeepAnswer = useDetail(queries.DEEP_ANSWER, deep_answer_id);
  const qDeepQuestions = useQuery(DEEP_QUESTIONS);
  const qCanvases = useQuery(CANVASES);

  if (editMode && qDeepAnswer.loading) return <Loading />;
  if (editMode && qDeepAnswer.error) return "Error";

  const onSubmit = (values) => {
    values.id = deep_answer_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { deepAnswer = {} } = qDeepAnswer.data;
  const { deepQuestions = [] } = qDeepQuestions.data;
  const { canvases = [] } = qCanvases.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Deep answer</div>
      <div className={styles.form}>
        <Formik
           initialValues={deepAnswer}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Text</label><br/>
          <Field type="text" name="text"
            className={styles.txt} />
          <br/>
          
          <div>
          <label className={styles.lbl}>Question</label>
          <Field component="select" name="question.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { deepQuestions.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
          <div>
          <label className={styles.lbl}>Canvas</label>
          <Field component="select" name="canvas.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { canvases.map((e, idx) => <option value={e.id}>{e.id}</option>) }
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

export default DeepAnswerForm;