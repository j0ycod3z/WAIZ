import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/dev_stage_statuses/Form.module.css";

const PROJECTS  = `
{
  projects { }
}
`;

const DEV_STAGES  = `
{
  devStages { }
}
`;

function DevStageStatusForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { dev_stage_status_id }  = props.match.params;
  const editMode = dev_stage_status_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_DEV_STAGE_STATUS, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_DEV_STAGE_STATUS, saveOptions);

  const qDevStageStatus = useDetail(queries.DEV_STAGE_STATUS, dev_stage_status_id);
  const qProjects = useQuery(PROJECTS);
  const qDevStages = useQuery(DEV_STAGES);

  if (editMode && qDevStageStatus.loading) return <Loading />;
  if (editMode && qDevStageStatus.error) return "Error";

  const onSubmit = (values) => {
    values.id = dev_stage_status_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { devStageStatus = {} } = qDevStageStatus.data;
  const { projects = [] } = qProjects.data;
  const { devStages = [] } = qDevStages.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Dev stage status</div>
      <div className={styles.form}>
        <Formik
           initialValues={devStageStatus}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Value</label>
          <Field type="checkbox" name="value"
            className={styles.chk} />
          <br/>
          
          <div>
          <label className={styles.lbl}>Project</label>
          <Field component="select" name="project.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { projects.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
          <div>
          <label className={styles.lbl}>Dev stage</label>
          <Field component="select" name="devStage.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { devStages.map((e, idx) => <option value={e.id}>{e.id}</option>) }
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

export default DevStageStatusForm;