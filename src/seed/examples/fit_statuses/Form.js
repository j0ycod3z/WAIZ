import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/fit_statuses/Form.module.css";

const PROJECTS  = `
{
  projects { }
}
`;

const FITS  = `
{
  fits { }
}
`;

function FitStatusForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { fit_status_id }  = props.match.params;
  const editMode = fit_status_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_FIT_STATUS, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_FIT_STATUS, saveOptions);

  const qFitStatus = useDetail(queries.FIT_STATUS, fit_status_id);
  const qProjects = useQuery(PROJECTS);
  const qFits = useQuery(FITS);

  if (editMode && qFitStatus.loading) return <Loading />;
  if (editMode && qFitStatus.error) return "Error";

  const onSubmit = (values) => {
    values.id = fit_status_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { fitStatus = {} } = qFitStatus.data;
  const { projects = [] } = qProjects.data;
  const { fits = [] } = qFits.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Fit status</div>
      <div className={styles.form}>
        <Formik
           initialValues={fitStatus}
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
          <label className={styles.lbl}>Fit</label>
          <Field component="select" name="fit.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { fits.map((e, idx) => <option value={e.id}>{e.id}</option>) }
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

export default FitStatusForm;