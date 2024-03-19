import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/profile_languages/Form.module.css";

const PROFILES  = `
{
  profiles { }
}
`;

function ProfileLanguageForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { profile_language_id }  = props.match.params;
  const editMode = profile_language_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_PROFILE_LANGUAGE, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_PROFILE_LANGUAGE, saveOptions);

  const qProfileLanguage = useDetail(queries.PROFILE_LANGUAGE, profile_language_id);
  const qProfiles = useQuery(PROFILES);

  if (editMode && qProfileLanguage.loading) return <Loading />;
  if (editMode && qProfileLanguage.error) return "Error";

  const onSubmit = (values) => {
    values.id = profile_language_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { profileLanguage = {} } = qProfileLanguage.data;
  const { profiles = [] } = qProfiles.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Profile language</div>
      <div className={styles.form}>
        <Formik
           initialValues={profileLanguage}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Name</label><br/>
          <Field type="text" name="name"
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

export default ProfileLanguageForm;