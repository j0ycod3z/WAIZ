import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/hypothesis_logs/Form.module.css";

const HYPOTHESES  = `
{
  hypotheses { }
}
`;

function HypothesisLogForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { hypothesis_log_id }  = props.match.params;
  const editMode = hypothesis_log_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_HYPOTHESIS_LOG, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_HYPOTHESIS_LOG, saveOptions);

  const qHypothesisLog = useDetail(queries.HYPOTHESIS_LOG, hypothesis_log_id);
  const qHypotheses = useQuery(HYPOTHESES);

  if (editMode && qHypothesisLog.loading) return <Loading />;
  if (editMode && qHypothesisLog.error) return "Error";

  const onSubmit = (values) => {
    values.id = hypothesis_log_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { hypothesisLog = {} } = qHypothesisLog.data;
  const { hypotheses = [] } = qHypotheses.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Hypothesis log</div>
      <div className={styles.form}>
        <Formik
           initialValues={hypothesisLog}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Date</label>
          <Field type="date" name="date"
            className={styles.dte} />
          <br/>
          
          <label className={styles.lbl}>Text</label><br/>
          <Field type="text" name="text"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Is valid</label>
          <Field type="checkbox" name="isValid"
            className={styles.chk} />
          <br/>
          
          <label className={styles.lbl}>Is tested</label>
          <Field type="checkbox" name="isTested"
            className={styles.chk} />
          <br/>
          
          <div>
          <label className={styles.lbl}>Ref</label>
          <Field component="select" name="ref.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { hypotheses.map((e, idx) => <option value={e.id}>{e.id}</option>) }
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

export default HypothesisLogForm;