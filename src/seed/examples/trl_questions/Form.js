import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/trl_questions/Form.module.css";

const LOCALES  = `
{
  locales { }
}
`;

const TRLS  = `
{
  trls { }
}
`;

function TrlQuestionForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { trl_question_id }  = props.match.params;
  const editMode = trl_question_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_TRL_QUESTION, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_TRL_QUESTION, saveOptions);

  const qTrlQuestion = useDetail(queries.TRL_QUESTION, trl_question_id);
  const qLocales = useQuery(LOCALES);
  const qTrls = useQuery(TRLS);

  if (editMode && qTrlQuestion.loading) return <Loading />;
  if (editMode && qTrlQuestion.error) return "Error";

  const onSubmit = (values) => {
    values.id = trl_question_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { trlQuestion = {} } = qTrlQuestion.data;
  const { locales = [] } = qLocales.data;
  const { trls = [] } = qTrls.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Trl question</div>
      <div className={styles.form}>
        <Formik
           initialValues={trlQuestion}
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
          
          <div>
          <label className={styles.lbl}>Trl</label>
          <Field component="select" name="trl.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { trls.map((e, idx) => <option value={e.id}>{e.id}</option>) }
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

export default TrlQuestionForm;