import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/profile_educations/Form.module.css";

const UNIVERSITIES  = `
{
  universities { }
}
`;

const PROFILES  = `
{
  profiles { }
}
`;

function ProfileEducationForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { profile_education_id }  = props.match.params;
  const editMode = profile_education_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_PROFILE_EDUCATION, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_PROFILE_EDUCATION, saveOptions);

  const qProfileEducation = useDetail(queries.PROFILE_EDUCATION, profile_education_id);
  const qUniversities = useQuery(UNIVERSITIES);
  const qProfiles = useQuery(PROFILES);

  if (editMode && qProfileEducation.loading) return <Loading />;
  if (editMode && qProfileEducation.error) return "Error";

  const onSubmit = (values) => {
    values.id = profile_education_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { profileEducation = {} } = qProfileEducation.data;
  const { universities = [] } = qUniversities.data;
  const { profiles = [] } = qProfiles.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Profile education</div>
      <div className={styles.form}>
        <Formik
           initialValues={profileEducation}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Degree</label><br/>
          <Field type="text" name="degree"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Period</label><br/>
          <Field type="text" name="period"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Activities groups</label><br/>
          <Field type="text" name="activitiesGroups"
            className={styles.txt} />
          <br/>
          
          <div>
          <label className={styles.lbl}>University</label>
          <Field component="select" name="university.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { universities.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
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

export default ProfileEducationForm;