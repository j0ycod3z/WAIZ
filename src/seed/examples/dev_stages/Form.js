import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/dev_stages/Form.module.css";

const LOCALES  = `
{
  locales { }
}
`;

function DevStageForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { dev_stage_id }  = props.match.params;
  const editMode = dev_stage_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_DEV_STAGE, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_DEV_STAGE, saveOptions);

  const qDevStage = useDetail(queries.DEV_STAGE, dev_stage_id);
  const qLocales = useQuery(LOCALES);

  if (editMode && qDevStage.loading) return <Loading />;
  if (editMode && qDevStage.error) return "Error";

  const onSubmit = (values) => {
    values.id = dev_stage_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { devStage = {} } = qDevStage.data;
  const { locales = [] } = qLocales.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Dev stage</div>
      <div className={styles.form}>
        <Formik
           initialValues={devStage}
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
          
          <label className={styles.lbl}>Category</label>
          <Field component="select" name="category.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="STARTUP">STARTUP</option>
            <option value="GROW_UP">GROW_UP</option>
            <option value="SCALE_UP">SCALE_UP</option>
            <option value="INDUSTRY_MASTER">INDUSTRY_MASTER</option>
          </Field>
          <br/>
          
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

export default DevStageForm;