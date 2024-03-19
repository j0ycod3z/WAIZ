import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/project_features/Form.module.css";

const PROJECT_DETAILS  = `
{
  projectDetails { }
}
`;

function ProjectFeatureForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { project_feature_id }  = props.match.params;
  const editMode = project_feature_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_PROJECT_FEATURE, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_PROJECT_FEATURE, saveOptions);

  const qProjectFeature = useDetail(queries.PROJECT_FEATURE, project_feature_id);
  const qProjectDetails = useQuery(PROJECT_DETAILS);

  if (editMode && qProjectFeature.loading) return <Loading />;
  if (editMode && qProjectFeature.error) return "Error";

  const onSubmit = (values) => {
    values.id = project_feature_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { projectFeature = {} } = qProjectFeature.data;
  const { projectDetails = [] } = qProjectDetails.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Project feature</div>
      <div className={styles.form}>
        <Formik
           initialValues={projectFeature}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Description</label><br/>
          <Field type="text" name="description"
            className={styles.txt} />
          <br/>
          
          <div>
          <label className={styles.lbl}>Project detail</label>
          <Field component="select" name="projectDetail.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { projectDetails.map((e, idx) => <option value={e.id}>{e.id}</option>) }
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

export default ProjectFeatureForm;