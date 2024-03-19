import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/profile_secondary_skills/Form.module.css";

const PROFILES  = `
{
  profiles { }
}
`;

function ProfileSecondarySkillForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { profile_secondary_skill_id }  = props.match.params;
  const editMode = profile_secondary_skill_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_PROFILE_SECONDARY_SKILL, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_PROFILE_SECONDARY_SKILL, saveOptions);

  const qProfileSecondarySkill = useDetail(queries.PROFILE_SECONDARY_SKILL, profile_secondary_skill_id);
  const qProfiles = useQuery(PROFILES);

  if (editMode && qProfileSecondarySkill.loading) return <Loading />;
  if (editMode && qProfileSecondarySkill.error) return "Error";

  const onSubmit = (values) => {
    values.id = profile_secondary_skill_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { profileSecondarySkill = {} } = qProfileSecondarySkill.data;
  const { profiles = [] } = qProfiles.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Profile secondary skill</div>
      <div className={styles.form}>
        <Formik
           initialValues={profileSecondarySkill}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Sector</label><br/>
          <Field type="text" name="sector"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Type</label><br/>
          <Field type="text" name="type"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Score</label><br/>
          <Field type="number" name="score"
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

export default ProfileSecondarySkillForm;