import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/projects/Form.module.css";

const CANVAS_TYPES  = `
{
  canvasTypes { }
}
`;

const USERS  = `
{
  users { }
}
`;

const COHORTS  = `
{
  cohorts { }
}
`;

function ProjectForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { project_id }  = props.match.params;
  const editMode = project_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_PROJECT, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_PROJECT, saveOptions);

  const qProject = useDetail(queries.PROJECT, project_id);
  const qCanvasTypes = useQuery(CANVAS_TYPES);
  const qUsers = useQuery(USERS);
  const qCohorts = useQuery(COHORTS);

  if (editMode && qProject.loading) return <Loading />;
  if (editMode && qProject.error) return "Error";

  const onSubmit = (values) => {
    values.id = project_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { project = {} } = qProject.data;
  const { canvasTypes = [] } = qCanvasTypes.data;
  const { users = [] } = qUsers.data;
  const { cohorts = [] } = qCohorts.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Project</div>
      <div className={styles.form}>
        <Formik
           initialValues={project}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Name</label><br/>
          <Field type="text" name="name"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Description</label><br/>
          <Field type="text" name="description"
            component="textarea" rows="3"
            className={styles.txa} />
          <br/>
          
          <label className={styles.lbl}>Image</label><br/>
          <Field type="text" name="image"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Is active</label>
          <Field type="checkbox" name="isActive"
            className={styles.chk} />
          <br/>
          
          <label className={styles.lbl}>Has phase1</label>
          <Field type="checkbox" name="hasPhase1"
            className={styles.chk} />
          <br/>
          
          <label className={styles.lbl}>Has phase21</label>
          <Field type="checkbox" name="hasPhase21"
            className={styles.chk} />
          <br/>
          
          <label className={styles.lbl}>Has phase22</label>
          <Field type="checkbox" name="hasPhase22"
            className={styles.chk} />
          <br/>
          
          <label className={styles.lbl}>Has phase23</label>
          <Field type="checkbox" name="hasPhase23"
            className={styles.chk} />
          <br/>
          
          <label className={styles.lbl}>Has phase24</label>
          <Field type="checkbox" name="hasPhase24"
            className={styles.chk} />
          <br/>
          
          <label className={styles.lbl}>Has phase25</label>
          <Field type="checkbox" name="hasPhase25"
            className={styles.chk} />
          <br/>
          
          <label className={styles.lbl}>Has phase3</label>
          <Field type="checkbox" name="hasPhase3"
            className={styles.chk} />
          <br/>
          
          <label className={styles.lbl}>Has phase4</label>
          <Field type="checkbox" name="hasPhase4"
            className={styles.chk} />
          <br/>
          
          <label className={styles.lbl}>Has phase5</label>
          <Field type="checkbox" name="hasPhase5"
            className={styles.chk} />
          <br/>
          
          <label className={styles.lbl}>V4 ref</label><br/>
          <Field type="number" name="v4Ref"
            className={styles.txt} />
          <br/>
          
          <div>
          <label className={styles.lbl}>Canvas type2</label>
          <Field component="select" name="canvasType2.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { canvasTypes.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
          <div>
          <label className={styles.lbl}>Admin</label>
          <Field component="select" name="admin.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { users.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
          <div>
          <label className={styles.lbl}>Cohort</label>
          <Field component="select" name="cohort.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { cohorts.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
          <div>
          <label className={styles.lbl}>Mentors</label>
          <div className={styles.mul}>
          <MultiField name="mentors"
            values={ users.map((e, idx) => { return {value: e, label: e.id}; }) }
            setFieldValue={f.setFieldValue} value={f.values.mentors} />
          </div>
          <br/>
          </div>
          
          <div>
          <label className={styles.lbl}>Members</label>
          <div className={styles.mul}>
          <MultiField name="members"
            values={ users.map((e, idx) => { return {value: e, label: e.id}; }) }
            setFieldValue={f.setFieldValue} value={f.values.members} />
          </div>
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

export default ProjectForm;