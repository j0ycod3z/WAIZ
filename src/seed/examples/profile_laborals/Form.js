import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/profile_laborals/Form.module.css";

const PROFILES  = `
{
  profiles { }
}
`;

function ProfileLaboralForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { profile_laboral_id }  = props.match.params;
  const editMode = profile_laboral_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_PROFILE_LABORAL, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_PROFILE_LABORAL, saveOptions);

  const qProfileLaboral = useDetail(queries.PROFILE_LABORAL, profile_laboral_id);
  const qProfiles = useQuery(PROFILES);

  if (editMode && qProfileLaboral.loading) return <Loading />;
  if (editMode && qProfileLaboral.error) return "Error";

  const onSubmit = (values) => {
    values.id = profile_laboral_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { profileLaboral = {} } = qProfileLaboral.data;
  const { profiles = [] } = qProfiles.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Profile laboral</div>
      <div className={styles.form}>
        <Formik
           initialValues={profileLaboral}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Job</label><br/>
          <Field type="text" name="job"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Company</label><br/>
          <Field type="text" name="company"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Period</label><br/>
          <Field type="text" name="period"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Company description</label><br/>
          <Field type="text" name="companyDescription"
            className={styles.txt} />
          <br/>
          
          <div>
          <label className={styles.lbl}>Profile</label>
          <Field component="select" name="profile.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { profiles.map((e, idx) => <option value={e.id}>{e.id}</option>) }
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

export default ProfileLaboralForm;