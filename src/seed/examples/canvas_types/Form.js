import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/canvas_types/Form.module.css";

const LOCALES  = `
{
  locales { }
}
`;

function CanvasTypeForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { canvas_type_id }  = props.match.params;
  const editMode = canvas_type_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_CANVAS_TYPE, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_CANVAS_TYPE, saveOptions);

  const qCanvasType = useDetail(queries.CANVAS_TYPE, canvas_type_id);
  const qLocales = useQuery(LOCALES);

  if (editMode && qCanvasType.loading) return <Loading />;
  if (editMode && qCanvasType.error) return "Error";

  const onSubmit = (values) => {
    values.id = canvas_type_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { canvasType = {} } = qCanvasType.data;
  const { locales = [] } = qLocales.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Canvas type</div>
      <div className={styles.form}>
        <Formik
           initialValues={canvasType}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Type</label>
          <Field component="select" name="type.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="BASIC">BASIC</option>
            <option value="BMC">BMC</option>
            <option value="EXO">EXO</option>
            <option value="IMPACT">IMPACT</option>
            <option value="PUBLIC">PUBLIC</option>
            <option value="SYSTEMIC">SYSTEMIC</option>
            <option value="REPUTATION">REPUTATION</option>
            <option value="PRODUCTIVITY">PRODUCTIVITY</option>
            <option value="BLANK">BLANK</option>
          </Field>
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
          <label className={styles.lbl}>L legend</label>
          <Field component="select" name="lLegend.id"
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

export default CanvasTypeForm;