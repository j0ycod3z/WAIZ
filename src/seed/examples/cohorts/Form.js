import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/cohorts/Form.module.css";

const USERS  = `
{
  users { }
}
`;

function CohortForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { cohort_id }  = props.match.params;
  const editMode = cohort_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_COHORT, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_COHORT, saveOptions);

  const qCohort = useDetail(queries.COHORT, cohort_id);
  const qUsers = useQuery(USERS);

  if (editMode && qCohort.loading) return <Loading />;
  if (editMode && qCohort.error) return "Error";

  const onSubmit = (values) => {
    values.id = cohort_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { cohort = {} } = qCohort.data;
  const { users = [] } = qUsers.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Cohort</div>
      <div className={styles.form}>
        <Formik
           initialValues={cohort}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Name</label><br/>
          <Field type="text" name="name"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Date</label>
          <Field type="date" name="date"
            className={styles.dte} />
          <br/>
          
          <label className={styles.lbl}>V4 ref</label><br/>
          <Field type="number" name="v4Ref"
            className={styles.txt} />
          <br/>
          
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
          <label className={styles.lbl}>Mentors</label>
          <div className={styles.mul}>
          <MultiField name="mentors"
            values={ users.map((e, idx) => { return {value: e, label: e.id}; }) }
            setFieldValue={f.setFieldValue} value={f.values.mentors} />
          </div>
          <br/>
          </div>
          
          <div>
          <label className={styles.lbl}>Instructors</label>
          <div className={styles.mul}>
          <MultiField name="instructors"
            values={ users.map((e, idx) => { return {value: e, label: e.id}; }) }
            setFieldValue={f.setFieldValue} value={f.values.instructors} />
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

export default CohortForm;