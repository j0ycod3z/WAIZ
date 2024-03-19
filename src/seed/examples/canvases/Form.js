import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/canvases/Form.module.css";

const CANVAS_TYPES  = `
{
  canvasTypes { }
}
`;

const PROJECTS  = `
{
  projects { }
}
`;

function CanvasForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { canvas_id }  = props.match.params;
  const editMode = canvas_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_CANVAS, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_CANVAS, saveOptions);

  const qCanvas = useDetail(queries.CANVAS, canvas_id);
  const qCanvasTypes = useQuery(CANVAS_TYPES);
  const qProjects = useQuery(PROJECTS);

  if (editMode && qCanvas.loading) return <Loading />;
  if (editMode && qCanvas.error) return "Error";

  const onSubmit = (values) => {
    values.id = canvas_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { canvas = {} } = qCanvas.data;
  const { canvasTypes = [] } = qCanvasTypes.data;
  const { projects = [] } = qProjects.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Canvas</div>
      <div className={styles.form}>
        <Formik
           initialValues={canvas}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <div>
          <label className={styles.lbl}>Type</label>
          <Field component="select" name="type.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { canvasTypes.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
          <div>
          <label className={styles.lbl}>Project</label>
          <Field component="select" name="project.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { projects.map((e, idx) => <option value={e.id}>{e.id}</option>) }
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

export default CanvasForm;